import { Module } from '@nestjs/common';
import { OrderTransfersController } from './order-transfers.controller';
import { OrderTransfersService } from './order-transfers.service';

@Module({
  controllers: [OrderTransfersController],
  providers: [OrderTransfersService]
})
export class OrderTransfersModule {}
