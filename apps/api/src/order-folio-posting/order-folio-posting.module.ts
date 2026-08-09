import { Module } from '@nestjs/common';
import { OrderFolioPostingController } from './order-folio-posting.controller';
import { OrderFolioPostingService } from './order-folio-posting.service';

@Module({
  controllers: [OrderFolioPostingController],
  providers: [OrderFolioPostingService]
})
export class OrderFolioPostingModule {}
