import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { StockTransfersService } from './stock-transfers.service';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';

@Controller('stock-transfers')
export class StockTransfersController {
  constructor(private readonly stockTransfersService: StockTransfersService) {}

  @Post()
  create(@Body() createStockTransferDto: CreateStockTransferDto) {
    return this.stockTransfersService.create(createStockTransferDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.stockTransfersService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTransfersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockTransferDto: UpdateStockTransferDto) {
    return this.stockTransfersService.update(+id, updateStockTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockTransfersService.remove(+id);
  }
}
