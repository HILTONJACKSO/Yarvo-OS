import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LostAndFoundService } from './lost-and-found.service';
import { CreateLostAndFoundDto } from './dto/create-lost-and-found.dto';
import { UpdateLostAndFoundDto } from './dto/update-lost-and-found.dto';

@Controller('lost-and-found')
export class LostAndFoundController {
  constructor(private readonly lostAndFoundService: LostAndFoundService) {}

  @Post()
  create(@Body() createLostAndFoundDto: CreateLostAndFoundDto) {
    return this.lostAndFoundService.create(createLostAndFoundDto);
  }

  @Get()
  findAll() {
    return this.lostAndFoundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostAndFoundService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLostAndFoundDto: UpdateLostAndFoundDto) {
    return this.lostAndFoundService.update(+id, updateLostAndFoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lostAndFoundService.remove(+id);
  }
}
