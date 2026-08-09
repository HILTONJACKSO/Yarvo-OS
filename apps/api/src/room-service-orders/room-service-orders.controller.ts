import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { RoomServiceOrdersService } from './room-service-orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('room-service-orders')
export class RoomServiceOrdersController {
  constructor(private readonly roomServiceOrdersService: RoomServiceOrdersService) {}

  @Get()
  getOrders() {
    return this.roomServiceOrdersService.getOrders();
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.roomServiceOrdersService.updateOrderStatus(id, status);
  }
}
