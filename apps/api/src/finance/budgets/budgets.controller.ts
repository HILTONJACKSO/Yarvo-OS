import { Controller, Get } from '@nestjs/common';
import { BudgetsService } from './budgets.service';

@Controller('finance/budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }
}
