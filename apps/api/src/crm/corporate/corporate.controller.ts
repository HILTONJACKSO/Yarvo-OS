import { Controller, Get } from '@nestjs/common';
import { CorporateService } from './corporate.service';

@Controller('crm/corporate')
export class CorporateController {
  constructor(private readonly corporateService: CorporateService) {}

  @Get()
  findAll() {
    return this.corporateService.findAll();
  }
}
