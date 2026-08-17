import { Controller, Get, Post, Delete, Param, Body, Headers } from '@nestjs/common';
import { MenuBuilderService } from './menu-builder.service';

@Controller('menu-builder')
export class MenuBuilderController {
  constructor(private readonly menuBuilderService: MenuBuilderService) {}

  @Get(':menuId/available')
  getAvailableCatalog(@Headers('x-business-id') businessId: string, @Param('menuId') menuId: string) {
    return this.menuBuilderService.getAvailableCatalog(businessId, menuId);
  }

  @Post(':menuId/categories')
  addCategory(@Param('menuId') menuId: string, @Body('categoryId') categoryId: string) {
    return this.menuBuilderService.addCategory(menuId, categoryId);
  }

  @Delete(':menuId/categories/:categoryId')
  removeCategory(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string) {
    return this.menuBuilderService.removeCategory(menuId, categoryId);
  }

  @Post(':menuId/items')
  addItem(@Param('menuId') menuId: string, @Body('catalogItemId') catalogItemId: string, @Body('priceOverride') priceOverride?: number) {
    return this.menuBuilderService.addItem(menuId, catalogItemId, priceOverride);
  }

  @Delete(':menuId/items/:itemId')
  removeItem(@Param('menuId') menuId: string, @Param('itemId') itemId: string) {
    return this.menuBuilderService.removeItem(menuId, itemId);
  }
}
