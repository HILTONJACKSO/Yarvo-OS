import { Module } from '@nestjs/common';
import { GateControlController } from './gate-control.controller';
import { GateControlService } from './gate-control.service';
import { TicketValidationService } from './ticket-validation.service';

@Module({
  controllers: [GateControlController],
  providers: [GateControlService, TicketValidationService]
})
export class GateControlModule {}
