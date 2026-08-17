import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatalogCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    const where = businessId ? { businessId } : {};
    return this.prisma.catalogCategory.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: { items: true }
        }
      }
    });
  }

  async create(businessId: string, data: any) {
    return this.prisma.catalogCategory.create({
      data: {
        ...data,
        businessId
      }
    });
  }

  async remove(id: string) {
    return this.prisma.catalogCategory.delete({
      where: { id }
    });
  }
}
