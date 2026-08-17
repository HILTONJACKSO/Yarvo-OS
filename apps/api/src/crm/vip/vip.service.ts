import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class VipService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.customer.findMany({
      where: { businessId,  isVip: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}
