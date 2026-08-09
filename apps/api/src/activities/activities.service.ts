import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId: string) {
    return this.prisma.userActivity.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  }
}
