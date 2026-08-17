import { Controller, Get, Patch, Param, Body, UseGuards, Post, Request, Headers } from '@nestjs/common';
import { RefundsService } from './refunds.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Get()
  findAll(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.refundsService.findAll(businessId);
  }

  @Post()
  create(@Request() req: any, @Body() payload: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.refundsService.create(businessId, payload);
  }

  @Patch(':id/status')
  updateStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: string) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.refundsService.updateStatus(businessId, id, status);
  }
}
