import { Controller, Get } from '@nestjs/common';
import { VipService } from './vip.service';

@Controller('crm/vip')
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Get()
  findAll() {
    return this.vipService.findAll();
  }
}
