import { Module } from '@nestjs/common';
import { ReservationWaitlistController } from './reservation-waitlist.controller';
import { ReservationWaitlistService } from './reservation-waitlist.service';

@Module({
  controllers: [ReservationWaitlistController],
  providers: [ReservationWaitlistService]
})
export class ReservationWaitlistModule {}
