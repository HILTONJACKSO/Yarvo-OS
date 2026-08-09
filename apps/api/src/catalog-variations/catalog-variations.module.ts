import { Module } from '@nestjs/common';
import { CatalogVariationsController } from './catalog-variations.controller';
import { CatalogVariationsService } from './catalog-variations.service';

@Module({
  controllers: [CatalogVariationsController],
  providers: [CatalogVariationsService]
})
export class CatalogVariationsModule {}
