import { Module } from '@nestjs/common';
import { CatalogPricingController } from './catalog-pricing.controller';
import { CatalogPricingService } from './catalog-pricing.service';

@Module({
  controllers: [CatalogPricingController],
  providers: [CatalogPricingService]
})
export class CatalogPricingModule {}
