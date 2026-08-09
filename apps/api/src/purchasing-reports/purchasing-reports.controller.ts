import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchasingReportsService } from './purchasing-reports.service';
import { CreatePurchasingReportDto } from './dto/create-purchasing-report.dto';
import { UpdatePurchasingReportDto } from './dto/update-purchasing-report.dto';

@Controller('purchasing-reports')
export class PurchasingReportsController {
  constructor(private readonly purchasingReportsService: PurchasingReportsService) {}

  @Post()
  create(@Body() createPurchasingReportDto: CreatePurchasingReportDto) {
    return this.purchasingReportsService.create(createPurchasingReportDto);
  }

  @Get()
  findAll() {
    return this.purchasingReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasingReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchasingReportDto: UpdatePurchasingReportDto) {
    return this.purchasingReportsService.update(+id, updatePurchasingReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasingReportsService.remove(+id);
  }
}
