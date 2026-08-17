import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RoomDamagesService } from './room-damages.service';
import { CreateRoomDamageDto } from './dto/create-room-damage.dto';
import { UpdateRoomDamageDto } from './dto/update-room-damage.dto';

@Controller('room-damages')
export class RoomDamagesController {
  constructor(private readonly roomDamagesService: RoomDamagesService) {}

  @Post()
  create(@Body() createRoomDamageDto: CreateRoomDamageDto) {
    return this.roomDamagesService.create(createRoomDamageDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.roomDamagesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomDamagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDamageDto: UpdateRoomDamageDto) {
    return this.roomDamagesService.update(+id, updateRoomDamageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomDamagesService.remove(+id);
  }
}
