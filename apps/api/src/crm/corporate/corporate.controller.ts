import { Controller, Get, Headers } from '@nestjs/common';
import { CorporateService } from './corporate.service';

@Controller('crm/corporate')
export class CorporateController {
  constructor(private readonly corporateService: CorporateService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.corporateService.findAll(businessId);
  }
}
