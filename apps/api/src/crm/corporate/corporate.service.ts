import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CorporateService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.corporateAccount.findMany({
      orderBy: { companyName: 'asc' }
    });
  }
}
