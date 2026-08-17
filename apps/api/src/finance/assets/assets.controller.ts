import { Controller, Get, Headers } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('finance/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.assetsService.findAll(businessId);
  }
}
