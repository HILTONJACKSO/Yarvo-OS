import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatalogItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll(businessId?: string) {
    return this.prisma.catalogItem.findMany({ where: businessId ? { businessId } : undefined, 
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

  async create(businessId: string, data: any) {
    // Basic code generation if missing
    let code = data.code;
    if (!code) {
      const count = await this.prisma.catalogItem.count({ where: { businessId } });
      code = `ITEM-${count + 1000}`;
    }

    return this.prisma.catalogItem.create({
      data: {
        businessId,
        name: data.name,
        code,
        customerFacingName: data.customerFacingName || null,
        categoryId: data.categoryId,
        itemType: data.itemType,
        basePrice: parseFloat(data.basePrice),
        costPrice: data.costPrice ? parseFloat(data.costPrice) : null,
        taxCategoryId: data.taxCategoryId || null,
        priceIncludesTax: data.priceIncludesTax,
        serviceChargeApplies: data.serviceChargeApplies,
        discountAllowed: data.discountAllowed,
        preparationRequired: data.preparationRequired,
        preparationRoute: data.preparationRoute,
        preparationTimeMinutes: data.preparationTimeMinutes ? parseInt(data.preparationTimeMinutes, 10) : null,
        inventoryTracked: data.inventoryTracked,
        sellableWithoutStock: data.sellableWithoutStock,
        lowStockBehavior: data.lowStockBehavior
      }
    });
  }

  async remove(id: string) {
    return this.prisma.catalogItem.delete({
      where: { id }
    });
  }
}

