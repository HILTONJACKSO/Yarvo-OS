import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.journalEntry.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: {
        entryDate: 'desc'
      }
    });
  }
}
