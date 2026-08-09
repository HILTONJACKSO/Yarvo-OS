import { Module } from '@nestjs/common';
import { CatalogAvailabilityController } from './catalog-availability.controller';
import { CatalogAvailabilityService } from './catalog-availability.service';

@Module({
  controllers: [CatalogAvailabilityController],
  providers: [CatalogAvailabilityService]
})
export class CatalogAvailabilityModule {}
