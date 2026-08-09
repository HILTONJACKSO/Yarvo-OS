import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestInvoiceDto } from './create-guest-invoice.dto';

export class UpdateGuestInvoiceDto extends PartialType(CreateGuestInvoiceDto) {}
