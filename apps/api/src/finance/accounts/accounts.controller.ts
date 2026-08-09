import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('finance/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }
}
