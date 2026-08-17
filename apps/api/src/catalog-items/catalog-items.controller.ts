import { Controller, Get, Post, Body, Headers, Delete, Param } from '@nestjs/common';
import { CatalogItemsService } from './catalog-items.service';

@Controller('catalog-items')
export class CatalogItemsController {
  constructor(private readonly catalogItemsService: CatalogItemsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.catalogItemsService.findAll(businessId);
  }

  @Post()
  create(@Headers('x-business-id') businessId: string, @Body() createDto: any) {
    return this.catalogItemsService.create(businessId, createDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catalogItemsService.remove(id);
  }
}
