import { Module } from '@nestjs/common';
import { RoomInspectionsService } from './room-inspections.service';
import { RoomInspectionsController } from './room-inspections.controller';

@Module({
  controllers: [RoomInspectionsController],
  providers: [RoomInspectionsService],
})
export class RoomInspectionsModule {}
