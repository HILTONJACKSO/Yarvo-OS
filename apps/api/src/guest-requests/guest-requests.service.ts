import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GuestRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.guestRequest.findMany({ where: businessId ? { businessId } : undefined, 
      include: {
        stay: {
          include: {
            reservation: {
              include: {
                customer: true,
                reservationRooms: {
                  include: {
                    room: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const open = await this.prisma.guestRequest.count({
      where: { status: 'OPEN' }
    });

    const inProgress = await this.prisma.guestRequest.count({
      where: { status: 'IN_PROGRESS' }
    });

    const completedToday = await this.prisma.guestRequest.count({
      where: { 
        status: 'COMPLETED',
        updatedAt: { gte: today }
      }
    });

    return {
      open,
      inProgress,
      completedToday,
      overdue: 0
    };
  }
}
