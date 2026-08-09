import { Module } from '@nestjs/common';
import { OrderDeliveryController } from './order-delivery.controller';
import { OrderDeliveryService } from './order-delivery.service';

@Module({
  controllers: [OrderDeliveryController],
  providers: [OrderDeliveryService]
})
export class OrderDeliveryModule {}
