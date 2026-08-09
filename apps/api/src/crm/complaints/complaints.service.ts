import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customerComplaint.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        assignedToUser: true
      }
    });
  }
}
