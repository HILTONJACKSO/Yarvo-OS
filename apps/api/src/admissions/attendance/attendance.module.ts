import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { CapacityControlService } from './capacity-control.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, CapacityControlService]
})
export class AttendanceModule {}
