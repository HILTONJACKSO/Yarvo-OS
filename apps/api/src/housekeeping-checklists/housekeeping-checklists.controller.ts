import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HousekeepingChecklistsService } from './housekeeping-checklists.service';
import { CreateHousekeepingChecklistDto } from './dto/create-housekeeping-checklist.dto';
import { UpdateHousekeepingChecklistDto } from './dto/update-housekeeping-checklist.dto';

@Controller('housekeeping-checklists')
export class HousekeepingChecklistsController {
  constructor(private readonly housekeepingChecklistsService: HousekeepingChecklistsService) {}

  @Post()
  create(@Body() createHousekeepingChecklistDto: CreateHousekeepingChecklistDto) {
    return this.housekeepingChecklistsService.create(createHousekeepingChecklistDto);
  }

  @Get()
  findAll() {
    return this.housekeepingChecklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housekeepingChecklistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHousekeepingChecklistDto: UpdateHousekeepingChecklistDto) {
    return this.housekeepingChecklistsService.update(+id, updateHousekeepingChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housekeepingChecklistsService.remove(+id);
  }
}
