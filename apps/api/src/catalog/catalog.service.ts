import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalProducts = await this.prisma.catalogItem.count();
    const activeProducts = await this.prisma.catalogItem.count({ where: { status: 'ACTIVE' } });
    const soldOutProducts = await this.prisma.catalogItem.count({ where: { availabilityStatus: 'SOLD_OUT' } });
    const categories = await this.prisma.catalogCategory.count();
    const menus = await this.prisma.menu.count();
    
    const missingPrices = await this.prisma.catalogItem.count({ where: { basePrice: 0 } });
    const missingCategories = await this.prisma.catalogItem.count({ where: { categoryId: '' } });
    
    const unassignedToMenu = await this.prisma.catalogItem.count({
      where: { menuItems: { none: {} } }
    });

    const inactiveServicePoints = await this.prisma.catalogItem.count({
      where: {
        servicePointOverrides: {
          some: { servicePoint: { status: 'INACTIVE' } }
        }
      }
    });

    return {
      totalProducts,
      activeProducts,
      soldOutProducts,
      categories,
      menus,
      missingPrices,
      missingCategories,
      unassignedToMenu,
      inactiveServicePoints,
      serviceItems: 0
    };
  }

  async getItems() {
    return this.prisma.catalogItem.findMany({
      orderBy: { name: 'asc' }
    });
  }
}
