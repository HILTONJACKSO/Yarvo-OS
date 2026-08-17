import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: AppWebsocketGateway
  ) {}

  async findAll(businessId: string) {
    if (!businessId) return [];
    return this.prisma.reservation.findMany({
      where: { businessId },
      include: {
        customer: true,
        reservationRooms: {
          include: { roomType: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  async getArrivals(businessId: string, date: string) {
    if (!businessId) return [];
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.prisma.reservation.findMany({
      where: {
        businessId,
        arrivalDate: {
          gte: start,
          lte: end
        },
        status: { in: ['CONFIRMED', 'GUARANTEED'] }
      },
      include: {
        customer: true,
        reservationRooms: { include: { roomType: true } }
      }
    });
  }

  async getDepartures(businessId: string, date: string) {
    if (!businessId) return [];
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.prisma.reservation.findMany({
      where: {
        businessId,
        departureDate: {
          gte: start,
          lte: end
        },
        status: { in: ['CHECKED_IN'] }
      },
      include: {
        customer: true,
        reservationRooms: { include: { roomType: true, room: true } }
      }
    });
  }

  async getDashboardStats(businessId: string) {
    if (!businessId) return { arrivalsCount: 0, departuresCount: 0, inHouseCount: 0 };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [arrivalsCount, departuresCount, inHouseCount] = await Promise.all([
      this.prisma.reservation.count({
        where: { businessId, arrivalDate: { gte: today, lt: tomorrow }, status: { in: ['CONFIRMED', 'GUARANTEED'] } }
      }),
      this.prisma.reservation.count({
        where: { businessId, departureDate: { gte: today, lt: tomorrow }, status: { in: ['CHECKED_IN'] } }
      }),
      this.prisma.stay.count({
        where: { businessId, status: 'CHECKED_IN' }
      })
    ]);

    return { arrivalsCount, departuresCount, inHouseCount };
  }

  async create(businessId: string, data: any) {
    if (!businessId) throw new Error('Business ID is required');
    let business = await this.prisma.business.findUnique({ where: { id: businessId }});
    if (!business) {
      throw new Error('Business not found');
    }

    let branch = await this.prisma.branch.findFirst({ where: { businessId }});
    if (!branch) {
      // Create a default branch for the business if none exists
      branch = await this.prisma.branch.create({
        data: {
          businessId: business.id,
          name: 'Main Branch',
          code: 'MAIN',
          phone: business.phone || '0000000000',
          email: business.email || 'info@hotel.com',
          address: business.address || '123 Main St',
          city: 'City',
          timezone: 'UTC',
        }
      });
    }

    let roomType = await this.prisma.roomType.findFirst({ where: { businessId }});
    if (!roomType) {
      roomType = await this.prisma.roomType.create({
        data: {
          businessId: business.id,
          branchId: branch.id,
          name: 'Standard Room',
          code: 'STD',
          standardCapacity: 2,
          maximumAdults: 2,
          maximumChildren: 1,
          bedCount: 1,
          bedType: 'QUEEN',
          basePrice: 100,
        }
      });
    }

    let customer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { email: data.guest.email || undefined },
          { phone: data.guest.phone || undefined }
        ],
        businessId: business.id
      }
    });

    if (!customer) {
      const customerNum = `CUST-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;
      customer = await this.prisma.customer.create({
        data: {
          businessId: business.id,
          customerNumber: customerNum,
          customerType: 'INDIVIDUAL',
          firstName: data.guest.firstName,
          lastName: data.guest.lastName,
          displayName: `${data.guest.firstName} ${data.guest.lastName}`,
          phone: data.guest.phone,
          email: data.guest.email,
        }
      });
    }

    const nights = Math.max(1, Math.ceil((new Date(data.stay.departureDate).getTime() - new Date(data.stay.arrivalDate).getTime()) / (1000 * 3600 * 24)));
    const rsvNum = `RSV-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;

    const reservation = await this.prisma.reservation.create({
      data: {
        businessId: business.id,
        branchId: branch.id,
        reservationNumber: rsvNum,
        customerId: customer.id,
        source: 'WEBSITE',
        status: data.status || 'CONFIRMED',
        arrivalDate: new Date(data.stay.arrivalDate),
        departureDate: new Date(data.stay.departureDate),
        adultCount: data.stay.adults || 1,
        childCount: data.stay.children || 0,
        infantCount: data.stay.infants || 0,
        numberOfRooms: data.stay.numberOfRooms || 1,
        currency: 'USD',
        subtotal: data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1),
        discountType: data.pricing.discountType,
        discountValue: data.pricing.discountValue,
        estimatedTaxAmount: data.pricing.taxAmount,
        estimatedTotal: (data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) - (data.pricing.discountType === 'FLAT' ? data.pricing.discountValue : (data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) * (data.pricing.discountValue / 100)) + (data.pricing.taxAmount || 0),
        depositRequired: (data.pricing.depositRequiredPercent / 100) * ((data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) - (data.pricing.discountType === 'FLAT' ? data.pricing.discountValue : (data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) * (data.pricing.discountValue / 100)) + (data.pricing.taxAmount || 0)),
        depositAmount: data.guarantee.depositAmount || 0,
        expectedBalance: ((data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) - (data.pricing.discountType === 'FLAT' ? data.pricing.discountValue : (data.pricing.basePrice * nights * (data.stay.numberOfRooms || 1)) * (data.pricing.discountValue / 100)) + (data.pricing.taxAmount || 0)) - (data.guarantee.depositAmount || 0),
        guaranteeType: data.guarantee.type,
        
        reservationRooms: {
          create: Array.from({ length: data.stay.numberOfRooms || 1 }).map(() => ({
            businessId: business.id,
            branchId: branch.id,
            roomTypeId: roomType.id,
            assignmentType: 'UNASSIGNED',
            adultCount: Math.ceil(data.stay.adults / (data.stay.numberOfRooms || 1)),
            childCount: Math.floor(data.stay.children / (data.stay.numberOfRooms || 1)),
            nightlyRate: data.pricing.basePrice,
            numberOfNights: nights,
            status: data.status || 'CONFIRMED',
            estimatedTotal: data.pricing.basePrice * nights,
          }))
        }
      },
      include: {
        customer: true,
        reservationRooms: {
          include: { roomType: true }
        }
      }
    });

    this.websocketGateway.broadcast('reservations.updated', { action: 'created', reservation }, businessId);

    return reservation;
  }
}
