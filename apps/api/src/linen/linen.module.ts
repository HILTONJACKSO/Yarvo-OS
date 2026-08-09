import { Module } from '@nestjs/common';
import { LinenService } from './linen.service';
import { LinenController } from './linen.controller';

@Module({
  controllers: [LinenController],
  providers: [LinenService],
})
export class LinenModule {}
