import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OnlineBookingRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.onlineBookingRequest.findMany({
      include: {
        roomType: true,
        customer: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
