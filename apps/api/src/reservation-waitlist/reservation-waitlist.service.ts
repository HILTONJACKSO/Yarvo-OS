import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReservationWaitlistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.reservationWaitlist.findMany({
      include: {
        customer: true,
        roomType: true
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}
