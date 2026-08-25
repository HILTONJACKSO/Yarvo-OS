import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { StockLocationsService } from './stock-locations.service';
import { CreateStockLocationDto } from './dto/create-stock-location.dto';
import { UpdateStockLocationDto } from './dto/update-stock-location.dto';

@Controller('stock-locations')
export class StockLocationsController {
  constructor(private readonly stockLocationsService: StockLocationsService) {}

  @Post()
  create(
    @Body() createStockLocationDto: any,
    @Headers('x-business-id') businessId: string,
    @Headers('x-branch-id') branchId: string
  ) {
    if (!businessId || !branchId) throw new Error('Missing auth headers');
    return this.stockLocationsService.create(createStockLocationDto, businessId, branchId);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.stockLocationsService.findAll(businessId);
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
