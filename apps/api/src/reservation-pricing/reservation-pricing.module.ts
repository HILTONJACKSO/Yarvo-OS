import { Module } from '@nestjs/common';
import { ReservationPricingService } from './reservation-pricing.service';

@Module({
  providers: [ReservationPricingService]
})
export class ReservationPricingModule {}
