import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.corporateReceivablesService.findAll();
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
