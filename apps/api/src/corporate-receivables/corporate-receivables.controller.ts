import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CorporateReceivablesService } from './corporate-receivables.service';
import { CreateCorporateReceivableDto } from './dto/create-corporate-receivable.dto';
import { UpdateCorporateReceivableDto } from './dto/update-corporate-receivable.dto';

@Controller('corporate-receivables')
export class CorporateReceivablesController {
  constructor(private readonly corporateReceivablesService: CorporateReceivablesService) {}

  @Post()
  create(@Body() createCorporateReceivableDto: CreateCorporateReceivableDto) {
    return this.corporateReceivablesService.create(createCorporateReceivableDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.corporateReceivablesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporateReceivablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorporateReceivableDto: UpdateCorporateReceivableDto) {
    return this.corporateReceivablesService.update(+id, updateCorporateReceivableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporateReceivablesService.remove(+id);
  }
}
