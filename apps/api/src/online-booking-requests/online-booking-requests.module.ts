import { Module } from '@nestjs/common';
import { OnlineBookingRequestsController } from './online-booking-requests.controller';
import { OnlineBookingRequestsService } from './online-booking-requests.service';

@Module({
  controllers: [OnlineBookingRequestsController],
  providers: [OnlineBookingRequestsService]
})
export class OnlineBookingRequestsModule {}
