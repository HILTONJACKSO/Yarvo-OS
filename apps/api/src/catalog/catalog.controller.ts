import { Controller, Get, Headers } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('stats')
  getStats() {
    return this.catalogService.getStats();
  }

  @Get('items')
  getItems() {
    return this.catalogService.getItems();
  }
}
