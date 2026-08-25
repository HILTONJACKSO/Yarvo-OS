import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  create(
    @Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
    @Headers('x-business-id') businessId: string,
    @Headers('x-branch-id') branchId: string,
    @Headers('x-user-id') userId: string
  ) {
    if (!businessId || !branchId || !userId) throw new Error('Missing auth headers');
    return this.purchaseOrdersService.create(createPurchaseOrderDto, businessId, branchId, userId);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.purchaseOrdersService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrdersService.update(+id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrdersService.remove(+id);
  }
}
