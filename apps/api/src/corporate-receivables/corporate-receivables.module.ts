import { Module } from '@nestjs/common';
import { CorporateReceivablesService } from './corporate-receivables.service';
import { CorporateReceivablesController } from './corporate-receivables.controller';

@Module({
  controllers: [CorporateReceivablesController],
  providers: [CorporateReceivablesService],
})
export class CorporateReceivablesModule {}
