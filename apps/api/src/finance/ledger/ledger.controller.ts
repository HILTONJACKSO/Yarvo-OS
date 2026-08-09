import { Controller, Get } from '@nestjs/common';
import { LedgerService } from './ledger.service';

@Controller('finance/ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get()
  findAll() {
    return this.ledgerService.findAll();
  }
}
