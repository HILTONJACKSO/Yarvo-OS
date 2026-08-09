import { Module } from '@nestjs/common';
import { VenuesModule } from './venues/venues.module';
import { TicketsModule } from './tickets/tickets.module';
import { GateControlModule } from './gate-control/gate-control.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MembershipsModule } from './memberships/memberships.module';
import { QrcodeModule } from './qrcode/qrcode.module';

@Module({
  imports: [VenuesModule, TicketsModule, GateControlModule, AttendanceModule, MembershipsModule, QrcodeModule]
})
export class AdmissionsModule {}
