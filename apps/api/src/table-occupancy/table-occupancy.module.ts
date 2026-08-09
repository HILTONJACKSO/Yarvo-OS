import { Module } from '@nestjs/common';
import { TableOccupancyController } from './table-occupancy.controller';
import { TableOccupancyService } from './table-occupancy.service';

@Module({
  controllers: [TableOccupancyController],
  providers: [TableOccupancyService]
})
export class TableOccupancyModule {}
