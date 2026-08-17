import { Injectable } from '@nestjs/common';
import { CreateGuestInvoiceDto } from './dto/create-guest-invoice.dto';
import { UpdateGuestInvoiceDto } from './dto/update-guest-invoice.dto';

@Injectable()
export class GuestInvoicesService {
  create(createGuestInvoiceDto: CreateGuestInvoiceDto) {
    return 'This action adds a new guestInvoice';
  }

  findAll(businessId?: string) {
    return `This action returns all guestInvoices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestInvoice`;
  }

  update(id: number, updateGuestInvoiceDto: UpdateGuestInvoiceDto) {
    return `This action updates a #${id} guestInvoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestInvoice`;
  }
}
