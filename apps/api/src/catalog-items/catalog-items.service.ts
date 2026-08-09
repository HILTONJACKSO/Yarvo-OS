import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatalogItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.catalogItem.findMany({
      orderBy: { name: 'asc' },
      include: {
        category: true,
        variations: true,
        dietaryTags: {
          include: { dietaryTag: true }
        },
        allergens: {
          include: { allergen: true }
        }
      }
    });
  }
}
