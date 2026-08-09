import { Module } from '@nestjs/common';
import { SupplierInvoicesService } from './supplier-invoices.service';
import { SupplierInvoicesController } from './supplier-invoices.controller';

import { PrismaModule } from '../prisma.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [PrismaModule, WebsocketModule],
  controllers: [SupplierInvoicesController],
  providers: [SupplierInvoicesService],
})
export class SupplierInvoicesModule {}
