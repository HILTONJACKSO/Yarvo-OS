import { Injectable } from '@nestjs/common';
import { CreateHousekeepingTaskDto } from './dto/create-housekeeping-task.dto';
import { UpdateHousekeepingTaskDto } from './dto/update-housekeeping-task.dto';

@Injectable()
export class HousekeepingTasksService {
  create(createHousekeepingTaskDto: CreateHousekeepingTaskDto) {
    return 'This action adds a new housekeepingTask';
  }

  findAll() {
    return `This action returns all housekeepingTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} housekeepingTask`;
  }

  update(id: number, updateHousekeepingTaskDto: UpdateHousekeepingTaskDto) {
    return `This action updates a #${id} housekeepingTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} housekeepingTask`;
  }
}
