import { Module } from '@nestjs/common';
import { InventoryWasteService } from './inventory-waste.service';
import { InventoryWasteController } from './inventory-waste.controller';

@Module({
  controllers: [InventoryWasteController],
  providers: [InventoryWasteService],
})
export class InventoryWasteModule {}
