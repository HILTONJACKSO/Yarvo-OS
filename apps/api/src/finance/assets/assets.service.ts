import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.fixedAsset.findMany({ where: businessId ? { businessId } : undefined, 
      orderBy: { purchaseDate: 'desc' }
    });
  }
}
