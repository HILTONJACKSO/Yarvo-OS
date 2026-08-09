import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CheckoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const departuresToday = await this.prisma.stay.count({
      where: {
        expectedDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    const pendingCheckouts = await this.prisma.stay.count({
      where: {
        status: 'CHECKED_IN',
        expectedDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    const completedToday = await this.prisma.stay.count({
      where: {
        status: 'COMPLETED',
        actualDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });

    // Approximate outstanding currentBalances by fetching stays with FOLIO open, but since Prisma doesn't easily sum across nested folios without heavy joins, we'll return a count of folios that are active for now
    const outstandingBalances = await this.prisma.guestFolio.count({
      where: { status: 'OPEN', currentBalance: { gt: 0 } }
    });

    return {
      departuresToday,
      pendingCheckouts,
      completedToday,
      outstandingBalances
    };
  }

  async getDepartures() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.stay.findMany({
      where: {
        expectedDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      },
      include: {
        reservation: {
          include: {
            customer: true,
            reservationRooms: {
              include: { room: true }
            }
          }
        },
        folios: true
      }
    });
  }

  async getPending() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.stay.findMany({
      where: {
        status: 'CHECKED_IN',
        expectedDepartureDateTime: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      },
      include: {
        reservation: {
          include: {
            customer: true,
            reservationRooms: {
              include: { room: true }
            }
          }
        },
        folios: true
      }
    });
  }

  async getHistory() {
    return this.prisma.stay.findMany({
      where: { status: 'COMPLETED' },
      include: {
        reservation: {
          include: {
            customer: true,
            reservationRooms: {
              include: { room: true }
            }
          }
        },
        folios: true
      },
      orderBy: { actualDepartureDateTime: 'desc' },
      take: 50
    });
  }

  async getOutstanding() {
    return this.prisma.stay.findMany({
      where: {
        folios: {
          some: { status: 'OPEN', currentBalance: { gt: 0 } }
        }
      },
      include: {
        reservation: {
          include: {
            customer: true,
            reservationRooms: {
              include: { room: true }
            }
          }
        },
        folios: true
      }
    });
  }
}
