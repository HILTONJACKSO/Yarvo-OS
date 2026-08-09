import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatalogCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.catalogCategory.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { items: true }
        }
      }
    });
  }
}
