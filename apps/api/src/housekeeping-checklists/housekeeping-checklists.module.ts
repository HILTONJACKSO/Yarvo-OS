import { Module } from '@nestjs/common';
import { HousekeepingChecklistsService } from './housekeeping-checklists.service';
import { HousekeepingChecklistsController } from './housekeeping-checklists.controller';

@Module({
  controllers: [HousekeepingChecklistsController],
  providers: [HousekeepingChecklistsService],
})
export class HousekeepingChecklistsModule {}
