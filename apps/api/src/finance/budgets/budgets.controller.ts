import { Controller, Get, Headers } from '@nestjs/common';
import { BudgetsService } from './budgets.service';

@Controller('finance/budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.budgetsService.findAll(businessId);
  }
}
