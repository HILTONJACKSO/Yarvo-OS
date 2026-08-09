import { Module } from '@nestjs/common';
import { KitchenDisplayController } from './kitchen-display.controller';
import { KitchenDisplayService } from './kitchen-display.service';

@Module({
  controllers: [KitchenDisplayController],
  providers: [KitchenDisplayService]
})
export class KitchenDisplayModule {}
