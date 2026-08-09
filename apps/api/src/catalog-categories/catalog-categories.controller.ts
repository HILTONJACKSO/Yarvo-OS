import { Controller, Get } from '@nestjs/common';
import { CatalogCategoriesService } from './catalog-categories.service';

@Controller('catalog-categories')
export class CatalogCategoriesController {
  constructor(private readonly catalogCategoriesService: CatalogCategoriesService) {}

  @Get()
  findAll() {
    return this.catalogCategoriesService.findAll();
  }
}
