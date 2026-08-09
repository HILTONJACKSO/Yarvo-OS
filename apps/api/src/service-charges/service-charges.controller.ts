import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ServiceChargesService } from './service-charges.service';

@Controller('service-charges')
export class ServiceChargesController {
  constructor(private readonly serviceChargesService: ServiceChargesService) {}

  @Post()
  create(@Headers('x-business-id') businessId: string, @Body() data: any) {
    return this.serviceChargesService.create(businessId, data);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    return this.serviceChargesService.findAll(businessId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Headers('x-business-id') businessId: string,
    @Body() data: any
  ) {
    return this.serviceChargesService.update(id, businessId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-business-id') businessId: string) {
    return this.serviceChargesService.remove(id, businessId);
  }
}
