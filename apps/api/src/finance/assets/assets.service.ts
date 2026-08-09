import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.fixedAsset.findMany({
      orderBy: { purchaseDate: 'desc' }
    });
  }
}
