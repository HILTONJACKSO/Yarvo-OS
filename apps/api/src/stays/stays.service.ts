import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StaysService {
  constructor(private readonly prisma: PrismaService) {}

  async getInHouse() {
    return this.prisma.stay.findMany({
      where: {
        status: 'CHECKED_IN'
      },
      include: {
        reservation: {
          include: {
            customer: true,
            reservationRooms: {
              include: {
                roomType: true,
                room: true
              }
            }
          }
        }
      }
    });
  }

  async getFrontDeskStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expectedArrivals = await this.prisma.reservation.count({
      where: {
        arrivalDate: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        },
        status: { in: ['CONFIRMED', 'GUARANTEED'] }
      }
    });

    const checkedInToday = await this.prisma.stay.count({
      where: {
        checkedInAt: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    const currentlyInHouse = await this.prisma.stay.count({
      where: { status: 'CHECKED_IN' }
    });

    const roomsOccupied = currentlyInHouse;
    
    const totalRooms = await this.prisma.room.count();
    const roomsAvailable = Math.max(0, totalRooms - roomsOccupied);

    const checkoutPending = await this.prisma.stay.count({
      where: {
        status: 'CHECKED_IN',
        expectedDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    return {
      expectedArrivals,
      checkedInToday,
      currentlyInHouse,
      roomsOccupied,
      roomsAvailable,
      checkoutPending,
      roomTransfersPending: 0,
      guestRequestsOpen: 0
    };
  }
}
