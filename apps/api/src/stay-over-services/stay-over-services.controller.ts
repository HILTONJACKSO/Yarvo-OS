import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StayOverServicesService } from './stay-over-services.service';
import { CreateStayOverServiceDto } from './dto/create-stay-over-service.dto';
import { UpdateStayOverServiceDto } from './dto/update-stay-over-service.dto';

@Controller('stay-over-services')
export class StayOverServicesController {
  constructor(private readonly stayOverServicesService: StayOverServicesService) {}

  @Post()
  create(@Body() createStayOverServiceDto: CreateStayOverServiceDto) {
    return this.stayOverServicesService.create(createStayOverServiceDto);
  }

  @Get()
  findAll() {
    return this.stayOverServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stayOverServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStayOverServiceDto: UpdateStayOverServiceDto) {
    return this.stayOverServicesService.update(+id, updateStayOverServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stayOverServicesService.remove(+id);
  }
}
