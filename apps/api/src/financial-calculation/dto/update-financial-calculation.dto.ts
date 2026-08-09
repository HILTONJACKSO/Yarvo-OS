import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialCalculationDto } from './create-financial-calculation.dto';

export class UpdateFinancialCalculationDto extends PartialType(CreateFinancialCalculationDto) {}
