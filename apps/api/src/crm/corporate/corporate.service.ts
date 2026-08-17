import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CorporateService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.corporateAccount.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { companyName: 'asc' }
    });
  }
}
