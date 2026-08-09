import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryWasteService } from './inventory-waste.service';
import { CreateInventoryWasteDto } from './dto/create-inventory-waste.dto';
import { UpdateInventoryWasteDto } from './dto/update-inventory-waste.dto';

@Controller('inventory-waste')
export class InventoryWasteController {
  constructor(private readonly inventoryWasteService: InventoryWasteService) {}

  @Post()
  create(@Body() createInventoryWasteDto: CreateInventoryWasteDto) {
    return this.inventoryWasteService.create(createInventoryWasteDto);
  }

  @Get()
  findAll() {
    return this.inventoryWasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryWasteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryWasteDto: UpdateInventoryWasteDto) {
    return this.inventoryWasteService.update(+id, updateInventoryWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryWasteService.remove(+id);
  }
}
