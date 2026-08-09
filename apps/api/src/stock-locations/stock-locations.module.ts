import { Module } from '@nestjs/common';
import { StockLocationsService } from './stock-locations.service';
import { StockLocationsController } from './stock-locations.controller';

@Module({
  controllers: [StockLocationsController],
  providers: [StockLocationsService],
})
export class StockLocationsModule {}
