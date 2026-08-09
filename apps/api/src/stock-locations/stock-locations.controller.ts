import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockLocationsService } from './stock-locations.service';
import { CreateStockLocationDto } from './dto/create-stock-location.dto';
import { UpdateStockLocationDto } from './dto/update-stock-location.dto';

@Controller('stock-locations')
export class StockLocationsController {
  constructor(private readonly stockLocationsService: StockLocationsService) {}

  @Post()
  create(@Body() createStockLocationDto: CreateStockLocationDto) {
    return this.stockLocationsService.create(createStockLocationDto);
  }

  @Get()
  findAll() {
    return this.stockLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockLocationDto: UpdateStockLocationDto) {
    return this.stockLocationsService.update(+id, updateStockLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockLocationsService.remove(+id);
  }
}
