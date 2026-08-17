import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { InventoryConsumptionService } from './inventory-consumption.service';
import { CreateInventoryConsumptionDto } from './dto/create-inventory-consumption.dto';
import { UpdateInventoryConsumptionDto } from './dto/update-inventory-consumption.dto';

@Controller('inventory-consumption')
export class InventoryConsumptionController {
  constructor(private readonly inventoryConsumptionService: InventoryConsumptionService) {}

  @Post()
  create(@Body() createInventoryConsumptionDto: CreateInventoryConsumptionDto) {
    return this.inventoryConsumptionService.create(createInventoryConsumptionDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.inventoryConsumptionService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryConsumptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryConsumptionDto: UpdateInventoryConsumptionDto) {
    return this.inventoryConsumptionService.update(+id, updateInventoryConsumptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryConsumptionService.remove(+id);
  }
}
