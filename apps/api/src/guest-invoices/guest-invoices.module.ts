import { Module } from '@nestjs/common';
import { GuestInvoicesService } from './guest-invoices.service';
import { GuestInvoicesController } from './guest-invoices.controller';

@Module({
  controllers: [GuestInvoicesController],
  providers: [GuestInvoicesService],
})
export class GuestInvoicesModule {}
