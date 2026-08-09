import { Module } from '@nestjs/common';
import { StayOccupantsController } from './stay-occupants.controller';
import { StayOccupantsService } from './stay-occupants.service';

@Module({
  controllers: [StayOccupantsController],
  providers: [StayOccupantsService]
})
export class StayOccupantsModule {}
