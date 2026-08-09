import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinancialCalculationService } from './financial-calculation.service';
import { CreateFinancialCalculationDto } from './dto/create-financial-calculation.dto';
import { UpdateFinancialCalculationDto } from './dto/update-financial-calculation.dto';

@Controller('financial-calculation')
export class FinancialCalculationController {
  constructor(private readonly financialCalculationService: FinancialCalculationService) {}

  @Post()
  create(@Body() createFinancialCalculationDto: CreateFinancialCalculationDto) {
    return this.financialCalculationService.create(createFinancialCalculationDto);
  }

  @Get()
  findAll() {
    return this.financialCalculationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialCalculationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinancialCalculationDto: UpdateFinancialCalculationDto) {
    return this.financialCalculationService.update(+id, updateFinancialCalculationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialCalculationService.remove(+id);
  }
}
