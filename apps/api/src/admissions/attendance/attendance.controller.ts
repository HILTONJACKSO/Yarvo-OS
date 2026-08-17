import { Controller, Get, Headers } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('admissions/stats')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  getStats() {
    return this.attendanceService.getStats();
  }
}
