import { Controller, Get, Post, Body, Param, Patch, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createDraftOrder(
    @Headers('x-business-id') businessId: string,
    @Headers('x-branch-id') branchId: string,
    @Body('orderType') orderType: string,
    @Body('serviceTableId') serviceTableId?: string
  ) {
    if (!businessId) businessId = 'bus-kwalee-1';
    if (!branchId) branchId = 'branch-kwalee-1';
    return this.ordersService.createDraftOrder(businessId, branchId, orderType, serviceTableId);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.ordersService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/items')
  updateItems(@Param('id') id: string, @Body('items') items: any[]) {
    return this.ordersService.updateItems(id, items);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body() data: { status: string, itemStatus?: string }) {
    return this.ordersService.updateOrderStatus(id, data);
  }

  @Patch('items/:itemId/status')
  updateItemStatus(@Param('itemId') itemId: string, @Body('status') status: string) {
    return this.ordersService.updateItemStatus(itemId, status);
  }

  @Post(':id/cancel')
  cancelOrder(@Param('id') id: string, @Body('pin') pin: string, @Headers('x-business-id') businessId: string) {
    return this.ordersService.cancelOrder(id, pin, businessId);
  }
}
