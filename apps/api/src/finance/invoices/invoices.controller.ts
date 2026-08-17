import { Controller, Get, Headers } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('finance/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.invoicesService.findAll(businessId);
  }
}
