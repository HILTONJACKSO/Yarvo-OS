import { Controller, Get, Post, Body, Headers, Delete, Param } from '@nestjs/common';
import { CatalogCategoriesService } from './catalog-categories.service';

@Controller('catalog-categories')
export class CatalogCategoriesController {
  constructor(private readonly catalogCategoriesService: CatalogCategoriesService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    return this.catalogCategoriesService.findAll(businessId);
  }

  @Post()
  create(@Headers('x-business-id') businessId: string, @Body() body: any) {
    return this.catalogCategoriesService.create(businessId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogCategoriesService.remove(id);
  }
}
