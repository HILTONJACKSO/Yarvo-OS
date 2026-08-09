import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { TaxesService } from './taxes.service';

@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  create(@Headers('x-business-id') businessId: string, @Body() data: any) {
    return this.taxesService.create(businessId, data);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    return this.taxesService.findAll(businessId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Headers('x-business-id') businessId: string,
    @Body() data: any
  ) {
    return this.taxesService.update(id, businessId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-business-id') businessId: string) {
    return this.taxesService.remove(id, businessId);
  }
}
