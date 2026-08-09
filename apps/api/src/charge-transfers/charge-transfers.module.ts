import { Module } from '@nestjs/common';
import { ChargeTransfersService } from './charge-transfers.service';
import { ChargeTransfersController } from './charge-transfers.controller';

@Module({
  controllers: [ChargeTransfersController],
  providers: [ChargeTransfersService],
})
export class ChargeTransfersModule {}
