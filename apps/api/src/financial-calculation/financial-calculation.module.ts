import { Module } from '@nestjs/common';
import { FinancialCalculationService } from './financial-calculation.service';
import { FinancialCalculationController } from './financial-calculation.controller';

@Module({
  controllers: [FinancialCalculationController],
  providers: [FinancialCalculationService],
})
export class FinancialCalculationModule {}
