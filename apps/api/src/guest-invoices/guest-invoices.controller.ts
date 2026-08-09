import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestInvoicesService } from './guest-invoices.service';
import { CreateGuestInvoiceDto } from './dto/create-guest-invoice.dto';
import { UpdateGuestInvoiceDto } from './dto/update-guest-invoice.dto';

@Controller('guest-invoices')
export class GuestInvoicesController {
  constructor(private readonly guestInvoicesService: GuestInvoicesService) {}

  @Post()
  create(@Body() createGuestInvoiceDto: CreateGuestInvoiceDto) {
    return this.guestInvoicesService.create(createGuestInvoiceDto);
  }

  @Get()
  findAll() {
    return this.guestInvoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestInvoicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestInvoiceDto: UpdateGuestInvoiceDto) {
    return this.guestInvoicesService.update(+id, updateGuestInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestInvoicesService.remove(+id);
  }
}
