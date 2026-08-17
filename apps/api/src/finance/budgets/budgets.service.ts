import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.budget.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { fiscalYear: 'desc' }
    });
  }
}
