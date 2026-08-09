import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createDraftOrder(@Body('orderType') orderType: string) {
    return this.ordersService.createDraftOrder(orderType);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
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
}
