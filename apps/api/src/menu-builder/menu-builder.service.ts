import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MenuBuilderService {
  constructor(private prisma: PrismaService) {}

  async getAvailableCatalog(businessId: string, menuId: string) {
    // Categories that are NOT in the menu
    const availableCategories = await this.prisma.catalogCategory.findMany({
      where: {
        businessId,
        menuCategories: {
          none: { menuId }
        }
      }
    });

    // Items that are NOT in the menu
    const availableItems = await this.prisma.catalogItem.findMany({
      where: {
        businessId,
        menuItems: {
          none: { menuId }
        }
      }
    });

    return { categories: availableCategories, items: availableItems };
  }

  async addCategory(menuId: string, categoryId: string) {
    return this.prisma.menuCategory.create({
      data: { menuId, categoryId }
    });
  }

  async removeCategory(menuId: string, categoryId: string) {
    return this.prisma.menuCategory.delete({
      where: {
        menuId_categoryId: { menuId, categoryId }
      }
    });
  }

  async addItem(menuId: string, catalogItemId: string, priceOverride?: number) {
    return this.prisma.menuItem.create({
      data: { 
        menuId, 
        catalogItemId,
        priceOverride: priceOverride || null
      }
    });
  }

  async removeItem(menuId: string, catalogItemId: string) {
    return this.prisma.menuItem.delete({
      where: {
        menuId_catalogItemId: { menuId, catalogItemId }
      }
    });
  }
}
