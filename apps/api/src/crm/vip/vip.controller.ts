import { Controller, Get, Headers } from '@nestjs/common';
import { VipService } from './vip.service';

@Controller('crm/vip')
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.vipService.findAll(businessId);
  }
}
