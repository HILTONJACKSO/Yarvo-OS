import { Module } from '@nestjs/common';
import { PurchasingReportsService } from './purchasing-reports.service';
import { PurchasingReportsController } from './purchasing-reports.controller';

@Module({
  controllers: [PurchasingReportsController],
  providers: [PurchasingReportsService],
})
export class PurchasingReportsModule {}
