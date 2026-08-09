import { Module } from '@nestjs/common';
import { CheckoutReviewService } from './checkout-review.service';
import { CheckoutReviewController } from './checkout-review.controller';

@Module({
  controllers: [CheckoutReviewController],
  providers: [CheckoutReviewService],
})
export class CheckoutReviewModule {}
