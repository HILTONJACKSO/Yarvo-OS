import { Controller, Get, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import { CashierShiftsService } from './cashier-shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cashier-shifts')
export class CashierShiftsController {
  constructor(private readonly cashierShiftsService: CashierShiftsService) {}

  @Get('current')
  getCurrentShift(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.cashierShiftsService.getCurrentShift(businessId);
  }

  @Post('open')
  openShift(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    const userId = req.user.userId;
    return this.cashierShiftsService.openShift(businessId, userId, payload);
  }

  @Post('close')
  closeShift(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    const userId = req.user.userId;
    return this.cashierShiftsService.closeShift(businessId, userId, payload);
  }
}
