import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { SupplierInvoicesService } from './supplier-invoices.service';
import { CreateSupplierInvoiceDto } from './dto/create-supplier-invoice.dto';
import { UpdateSupplierInvoiceDto } from './dto/update-supplier-invoice.dto';

@Controller('supplier-invoices')
export class SupplierInvoicesController {
  constructor(private readonly supplierInvoicesService: SupplierInvoicesService) {}

  @Get('stats')
  getStats() {
    return this.supplierInvoicesService.getStats();
  }

  @Post()
  create(@Body() createSupplierInvoiceDto: CreateSupplierInvoiceDto) {
    return this.supplierInvoicesService.create(createSupplierInvoiceDto);
  }

  @Get()
  findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.supplierInvoicesService.findAll(businessId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierInvoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierInvoiceDto: UpdateSupplierInvoiceDto) {
    return this.supplierInvoicesService.update(+id, updateSupplierInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierInvoicesService.remove(+id);
  }
}
