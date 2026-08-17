import { Injectable } from '@nestjs/common';
import { CreateFinancialCalculationDto } from './dto/create-financial-calculation.dto';
import { UpdateFinancialCalculationDto } from './dto/update-financial-calculation.dto';

@Injectable()
export class FinancialCalculationService {
  create(createFinancialCalculationDto: CreateFinancialCalculationDto) {
    return 'This action adds a new financialCalculation';
  }

  findAll(businessId?: string) {
    return `This action returns all financialCalculation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialCalculation`;
  }

  update(id: number, updateFinancialCalculationDto: UpdateFinancialCalculationDto) {
    return `This action updates a #${id} financialCalculation`;
  }

  remove(id: number) {
    return `This action removes a #${id} financialCalculation`;
  }
}
