import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { StockBalancesService } from './stock-balances.service';
import { CreateStockBalanceDto } from './dto/create-stock-balance.dto';
import { UpdateStockBalanceDto } from './dto/update-stock-balance.dto';

@Controller('stock-balances')
export class StockBalancesController {
  constructor(private readonly stockBalancesService: StockBalancesService) {}

  @Post()
  create(@Body() createStockBalanceDto: CreateStockBalanceDto) {
    return this.stockBalancesService.create(createStockBalanceDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.stockBalancesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockBalancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockBalanceDto: UpdateStockBalanceDto) {
    return this.stockBalancesService.update(+id, updateStockBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockBalancesService.remove(+id);
  }
}
