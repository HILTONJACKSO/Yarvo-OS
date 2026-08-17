import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OnlineBookingRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.onlineBookingRequest.findMany({ where: businessId ? { businessId } : undefined, 
      include: {
        roomType: true,
        customer: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
