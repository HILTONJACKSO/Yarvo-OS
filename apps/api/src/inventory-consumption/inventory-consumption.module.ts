import { Module } from '@nestjs/common';
import { InventoryConsumptionService } from './inventory-consumption.service';
import { InventoryConsumptionController } from './inventory-consumption.controller';

@Module({
  controllers: [InventoryConsumptionController],
  providers: [InventoryConsumptionService],
})
export class InventoryConsumptionModule {}
