import { Module } from '@nestjs/common';
import { RoomBlocksController } from './room-blocks.controller';
import { RoomBlocksService } from './room-blocks.service';

@Module({
  controllers: [RoomBlocksController],
  providers: [RoomBlocksService]
})
export class RoomBlocksModule {}
