import { Controller, Get } from '@nestjs/common';
import { CatalogItemsService } from './catalog-items.service';

@Controller('catalog-items')
export class CatalogItemsController {
  constructor(private readonly catalogItemsService: CatalogItemsService) {}

  @Get()
  findAll() {
    return this.catalogItemsService.findAll();
  }
}
