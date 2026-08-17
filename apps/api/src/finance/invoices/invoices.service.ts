import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.invoice.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { invoiceDate: 'desc' }
    });
  }
}
