import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { HousekeepingTasksService } from './housekeeping-tasks.service';
import { CreateHousekeepingTaskDto } from './dto/create-housekeeping-task.dto';
import { UpdateHousekeepingTaskDto } from './dto/update-housekeeping-task.dto';

@Controller('housekeeping-tasks')
export class HousekeepingTasksController {
  constructor(private readonly housekeepingTasksService: HousekeepingTasksService) {}

  @Post()
  create(@Body() createHousekeepingTaskDto: CreateHousekeepingTaskDto) {
    return this.housekeepingTasksService.create(createHousekeepingTaskDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.housekeepingTasksService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housekeepingTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHousekeepingTaskDto: UpdateHousekeepingTaskDto) {
    return this.housekeepingTasksService.update(+id, updateHousekeepingTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housekeepingTasksService.remove(+id);
  }
}
