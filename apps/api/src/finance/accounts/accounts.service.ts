import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.account.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: [
        { type: 'asc' },
        { accountCode: 'asc' }
      ]
    });
  }
}
