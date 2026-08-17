import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RoomInspectionsService } from './room-inspections.service';
import { CreateRoomInspectionDto } from './dto/create-room-inspection.dto';
import { UpdateRoomInspectionDto } from './dto/update-room-inspection.dto';

@Controller('room-inspections')
export class RoomInspectionsController {
  constructor(private readonly roomInspectionsService: RoomInspectionsService) {}

  @Post()
  create(@Body() createRoomInspectionDto: CreateRoomInspectionDto) {
    return this.roomInspectionsService.create(createRoomInspectionDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.roomInspectionsService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomInspectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomInspectionDto: UpdateRoomInspectionDto) {
    return this.roomInspectionsService.update(+id, updateRoomInspectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomInspectionsService.remove(+id);
  }
}
