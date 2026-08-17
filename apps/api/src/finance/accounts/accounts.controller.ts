import { Controller, Get, Headers } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('finance/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.accountsService.findAll(businessId);
  }
}
