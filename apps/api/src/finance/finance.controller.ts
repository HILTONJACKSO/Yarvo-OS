import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('finance')
export class FinanceController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats() {
    const cashAccounts = await this.prisma.account.aggregate({
      where: { subType: 'CASH' },
      _sum: { balance: true }
    });

    const receivableAccounts = await this.prisma.account.aggregate({
      where: { subType: 'RECEIVABLE' },
      _sum: { balance: true }
    });

    const payableAccounts = await this.prisma.account.aggregate({
      where: { subType: 'PAYABLE' },
      _sum: { balance: true }
    });

    return {
      operatingCash: cashAccounts._sum.balance || 0,
      accountsReceivable: receivableAccounts._sum.balance || 0,
      accountsPayable: payableAccounts._sum.balance || 0,
    };
  }
}
