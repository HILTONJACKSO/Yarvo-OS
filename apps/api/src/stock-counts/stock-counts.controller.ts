import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockCountsService } from './stock-counts.service';
import { CreateStockCountDto } from './dto/create-stock-count.dto';
import { UpdateStockCountDto } from './dto/update-stock-count.dto';

@Controller('stock-counts')
export class StockCountsController {
  constructor(private readonly stockCountsService: StockCountsService) {}

  @Post()
  create(@Body() createStockCountDto: CreateStockCountDto) {
    return this.stockCountsService.create(createStockCountDto);
  }

  @Get()
  findAll() {
    return this.stockCountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockCountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockCountDto: UpdateStockCountDto) {
    return this.stockCountsService.update(+id, updateStockCountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockCountsService.remove(+id);
  }
}
