import { Controller, Get, Headers } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('crm/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.customersService.findAll(businessId);
  }
}
