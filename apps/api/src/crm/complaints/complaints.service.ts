import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.customerComplaint.findMany({ where: businessId ? { customer: { businessId } } : undefined, 
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        assignedToUser: true
      }
    });
  }
}
