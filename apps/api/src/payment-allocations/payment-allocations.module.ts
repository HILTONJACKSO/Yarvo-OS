import { Module } from '@nestjs/common';
import { PaymentAllocationsService } from './payment-allocations.service';
import { PaymentAllocationsController } from './payment-allocations.controller';

@Module({
  controllers: [PaymentAllocationsController],
  providers: [PaymentAllocationsService],
})
export class PaymentAllocationsModule {}
