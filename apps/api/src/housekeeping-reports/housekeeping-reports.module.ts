import { Module } from '@nestjs/common';
import { HousekeepingReportsService } from './housekeeping-reports.service';
import { HousekeepingReportsController } from './housekeeping-reports.controller';

@Module({
  controllers: [HousekeepingReportsController],
  providers: [HousekeepingReportsService],
})
export class HousekeepingReportsModule {}
