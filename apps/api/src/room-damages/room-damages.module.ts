import { Module } from '@nestjs/common';
import { RoomDamagesService } from './room-damages.service';
import { RoomDamagesController } from './room-damages.controller';

@Module({
  controllers: [RoomDamagesController],
  providers: [RoomDamagesService],
})
export class RoomDamagesModule {}
