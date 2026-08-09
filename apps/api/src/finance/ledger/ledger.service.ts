import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.journalEntry.findMany({
      orderBy: {
        entryDate: 'desc'
      }
    });
  }
}
