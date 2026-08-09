import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinenService } from './linen.service';
import { CreateLinenDto } from './dto/create-linen.dto';
import { UpdateLinenDto } from './dto/update-linen.dto';

@Controller('linen')
export class LinenController {
  constructor(private readonly linenService: LinenService) {}

  @Post()
  create(@Body() createLinenDto: CreateLinenDto) {
    return this.linenService.create(createLinenDto);
  }

  @Get()
  findAll() {
    return this.linenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinenDto: UpdateLinenDto) {
    return this.linenService.update(+id, updateLinenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linenService.remove(+id);
  }
}
