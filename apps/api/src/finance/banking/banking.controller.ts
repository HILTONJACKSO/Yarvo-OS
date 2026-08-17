import { Controller, Get, Headers } from '@nestjs/common';
import { BankingService } from './banking.service';

@Controller('finance/banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.bankingService.findAll(businessId);
  }
}
