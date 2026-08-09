import { Module } from '@nestjs/common';
import { OrderMergingController } from './order-merging.controller';
import { OrderMergingService } from './order-merging.service';

@Module({
  controllers: [OrderMergingController],
  providers: [OrderMergingService]
})
export class OrderMergingModule {}
