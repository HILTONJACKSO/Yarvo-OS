import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
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
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.housekeepingChecklistsService.findAll(businessId);
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
