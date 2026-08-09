import { Module } from '@nestjs/common';
import { ReservationDepositsController } from './reservation-deposits.controller';
import { ReservationDepositsService } from './reservation-deposits.service';

@Module({
  controllers: [ReservationDepositsController],
  providers: [ReservationDepositsService]
})
export class ReservationDepositsModule {}
