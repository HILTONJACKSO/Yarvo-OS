import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReservationWaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.reservationWaitlist.findMany({ where: businessId ? { businessId } : undefined, 
      include: {
        customer: true,
        roomType: true
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}
