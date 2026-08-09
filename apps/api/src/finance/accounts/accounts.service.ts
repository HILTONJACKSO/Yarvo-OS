import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.account.findMany({
      orderBy: [
        { type: 'asc' },
        { accountCode: 'asc' }
      ]
    });
  }
}
