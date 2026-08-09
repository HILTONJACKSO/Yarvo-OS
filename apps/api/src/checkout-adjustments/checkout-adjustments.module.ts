import { Module } from '@nestjs/common';
import { CheckoutAdjustmentsService } from './checkout-adjustments.service';
import { CheckoutAdjustmentsController } from './checkout-adjustments.controller';

@Module({
  controllers: [CheckoutAdjustmentsController],
  providers: [CheckoutAdjustmentsService],
})
export class CheckoutAdjustmentsModule {}
