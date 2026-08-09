import { Module } from '@nestjs/common';
import { BarDisplayController } from './bar-display.controller';
import { BarDisplayService } from './bar-display.service';

@Module({
  controllers: [BarDisplayController],
  providers: [BarDisplayService]
})
export class BarDisplayModule {}
