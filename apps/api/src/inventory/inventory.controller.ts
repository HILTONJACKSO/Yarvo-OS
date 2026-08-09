import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stats')
  getDashboardStats() {
    return this.inventoryService.getDashboardStats();
  }

  @Get('items')
  getItems() {
    return this.inventoryService.getItems();
  }

  @Get('stock-levels')
  getStockLevels() {
    return this.inventoryService.getStockLevels();
  }

  @Get('movements')
  getMovements() {
    return this.inventoryService.getMovements();
  }

  @Get('transfers')
  getTransfers() {
    return this.inventoryService.getTransfers();
  }

  @Get('recipes')
  getRecipes() {
    return this.inventoryService.getRecipes();
  }

  @Get('counts')
  getCounts() {
    return this.inventoryService.getCounts();
  }

  @Get('waste')
  getWaste() {
    return this.inventoryService.getWaste();
  }

  @Get('categories')
  getCategories() {
    return this.inventoryService.getCategories();
  }

  @Get('units')
  getUnits() {
    return this.inventoryService.getUnits();
  }

  @Get('locations')
  getLocations() {
    return this.inventoryService.getLocations();
  }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
