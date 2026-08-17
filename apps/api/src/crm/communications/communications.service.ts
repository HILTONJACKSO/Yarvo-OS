import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CommunicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.customerCommunication.findMany({ where: businessId ? { customer: { businessId } } : undefined, 
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true
      }
    });
  }
}
