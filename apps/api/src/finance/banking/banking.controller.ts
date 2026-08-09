import { Controller, Get } from '@nestjs/common';
import { BankingService } from './banking.service';

@Controller('finance/banking')
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  @Get()
  findAll() {
    return this.bankingService.findAll();
  }
}
