import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateCountDto } from './dto/create-count.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateCountItemsDto } from './dto/update-count-items.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stats')
  getDashboardStats(@Headers('x-business-id') businessId: string) {
    if (!businessId) businessId = 'bus-kwalee-1';
    return this.inventoryService.getDashboardStats(businessId);
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

  @Post('transfers')
  createTransfer(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Headers('x-user-id') userId: string, @Body() createTransferDto: CreateTransferDto) {
    const defaultBusinessId = businessId || 'bus-kwalee-1';
    const defaultBranchId = branchId || 'branch-kwalee-1';
    const defaultUserId = userId || 'user-1';
    return this.inventoryService.createTransfer(defaultBusinessId, defaultBranchId, defaultUserId, createTransferDto);
  }

  @Post('issues')
  createDepartmentIssue(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Headers('x-user-id') userId: string, @Body() createIssueDto: CreateIssueDto) {
    const defaultBusinessId = businessId || 'bus-kwalee-1';
    const defaultBranchId = branchId || 'branch-kwalee-1';
    const defaultUserId = userId || 'user-1';
    return this.inventoryService.createDepartmentIssue(defaultBusinessId, defaultBranchId, defaultUserId, createIssueDto);
  }

  @Get('recipes')
  getRecipes() {
    return this.inventoryService.getRecipes();
  }

  @Post('recipes')
  createRecipe(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Body() body: any) {
    if (!businessId) businessId = 'bus-kwalee-1';
    if (!branchId) branchId = 'branch-kwalee-1';
    return this.inventoryService.createRecipe(businessId, branchId, body);
  }

  @Get('counts')
  getCounts() {
    return this.inventoryService.getCounts();
  }

  @Get('counts/:id')
  getCountById(@Param('id') id: string) {
    console.log('ID RECEIVED IN getCountById:', id, 'length:', id?.length);
    return this.inventoryService.getCountById(id);
  }

  @Patch('counts/:id/items')
  updateCountItems(@Param('id') id: string, @Body() updateCountItemsDto: UpdateCountItemsDto) {
    return this.inventoryService.updateCountItems(id, updateCountItemsDto);
  }

  @Post('counts/:id/complete')
  completeCount(@Param('id') id: string) {
    return this.inventoryService.completeCount(id);
  }

  @Post('counts')
  createCount(@Headers('x-business-id') businessId: string, @Body() createCountDto: CreateCountDto) {
    if (!businessId) businessId = 'bus-kwalee-1';
    return this.inventoryService.createCount(businessId, createCountDto);
  }

  @Get('waste')
  getWaste() {
    return this.inventoryService.getWaste();
  }

  @Post('waste')
  createWaste(@Headers('x-business-id') businessId: string, @Headers('x-branch-id') branchId: string, @Headers('x-user-id') userId: string, @Body() body: any) {
    if (!businessId) businessId = 'bus-kwalee-1';
    if (!branchId) branchId = 'branch-kwalee-1';
    if (!userId) userId = 'user-1';
    return this.inventoryService.createWaste(businessId, branchId, userId, body);
  }

  @Patch('waste/:id/status')
  updateWasteStatus(@Param('id') id: string, @Headers('x-user-id') userId: string, @Body('status') status: string) {
    if (!userId) userId = 'user-1';
    return this.inventoryService.updateWasteStatus(id, status, userId);
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

  @Post('locations')
  createLocation(@Headers('x-business-id') businessId: string, @Body() createLocationDto: CreateLocationDto) {
    if (!businessId) businessId = 'bus-kwalee-1';
    return this.inventoryService.createLocation(businessId, createLocationDto);
  }

  @Post()
  create(@Headers('x-business-id') businessId: string, @Body() createInventoryDto: CreateInventoryDto) {
    if (!businessId) {
      businessId = 'bus-kwalee-1'; // fallback for demo
    }
    return this.inventoryService.create(businessId, createInventoryDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.inventoryService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
