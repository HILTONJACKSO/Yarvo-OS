import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { CashRegistersService } from './cash-registers.service';

@Controller('cash-registers')
export class CashRegistersController {
  constructor(private readonly cashRegistersService: CashRegistersService) {}

  @Post()
  create(
    @Headers('x-business-id') businessId: string, 
    @Headers('x-branch-id') branchId: string, 
    @Body() data: any
  ) {
    return this.cashRegistersService.create(businessId, branchId, data);
  }

  @Get()
  findAll(
    @Headers('x-business-id') businessId: string,
    @Headers('x-branch-id') branchId: string
  ) {
    return this.cashRegistersService.findAll(businessId, branchId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Headers('x-business-id') businessId: string,
    @Body() data: any
  ) {
    return this.cashRegistersService.update(id, businessId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-business-id') businessId: string) {
    return this.cashRegistersService.remove(id, businessId);
  }
}
