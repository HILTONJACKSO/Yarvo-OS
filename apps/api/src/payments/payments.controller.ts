import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('stats')
  getStats(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.paymentsService.getStats(businessId);
  }

  @Get()
  findAll(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.paymentsService.findAll(businessId);
  }

  @Post()
  create(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.paymentsService.create(businessId, payload);
  }
}
