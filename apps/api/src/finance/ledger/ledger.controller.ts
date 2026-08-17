import { Controller, Get, Headers } from '@nestjs/common';
import { LedgerService } from './ledger.service';

@Controller('finance/ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.ledgerService.findAll(businessId);
  }
}
