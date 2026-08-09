import { Module } from '@nestjs/common';
import { HousekeepingTasksService } from './housekeeping-tasks.service';
import { HousekeepingTasksController } from './housekeeping-tasks.controller';

@Module({
  controllers: [HousekeepingTasksController],
  providers: [HousekeepingTasksService],
})
export class HousekeepingTasksModule {}
