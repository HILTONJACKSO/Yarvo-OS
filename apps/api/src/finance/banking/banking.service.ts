import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class BankingService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.bankAccount.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { accountName: 'asc' }
    });
  }
}
