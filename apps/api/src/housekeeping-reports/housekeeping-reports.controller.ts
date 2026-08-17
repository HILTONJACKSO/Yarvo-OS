import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { HousekeepingReportsService } from './housekeeping-reports.service';
import { CreateHousekeepingReportDto } from './dto/create-housekeeping-report.dto';
import { UpdateHousekeepingReportDto } from './dto/update-housekeeping-report.dto';

@Controller('housekeeping-reports')
export class HousekeepingReportsController {
  constructor(private readonly housekeepingReportsService: HousekeepingReportsService) {}

  @Post()
  create(@Body() createHousekeepingReportDto: CreateHousekeepingReportDto) {
    return this.housekeepingReportsService.create(createHousekeepingReportDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.housekeepingReportsService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housekeepingReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHousekeepingReportDto: UpdateHousekeepingReportDto) {
    return this.housekeepingReportsService.update(+id, updateHousekeepingReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housekeepingReportsService.remove(+id);
  }
}
