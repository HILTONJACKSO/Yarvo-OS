import { Module } from '@nestjs/common';
import { RoomTransfersController } from './room-transfers.controller';
import { RoomTransfersService } from './room-transfers.service';

@Module({
  controllers: [RoomTransfersController],
  providers: [RoomTransfersService]
})
export class RoomTransfersModule {}
