import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { InventoryBatchesService } from './inventory-batches.service';
import { CreateInventoryBatchDto } from './dto/create-inventory-batch.dto';
import { UpdateInventoryBatchDto } from './dto/update-inventory-batch.dto';

@Controller('inventory-batches')
export class InventoryBatchesController {
  constructor(private readonly inventoryBatchesService: InventoryBatchesService) {}

  @Post()
  create(@Body() createInventoryBatchDto: CreateInventoryBatchDto) {
    return this.inventoryBatchesService.create(createInventoryBatchDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.inventoryBatchesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryBatchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryBatchDto: UpdateInventoryBatchDto) {
    return this.inventoryBatchesService.update(+id, updateInventoryBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryBatchesService.remove(+id);
  }
}
