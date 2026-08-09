import { Module } from '@nestjs/common';
import { OrderRoundsController } from './order-rounds.controller';
import { OrderRoundsService } from './order-rounds.service';

@Module({
  controllers: [OrderRoundsController],
  providers: [OrderRoundsService]
})
export class OrderRoundsModule {}
