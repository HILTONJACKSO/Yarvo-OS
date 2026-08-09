import { Module } from '@nestjs/common';
import { StockBalancesService } from './stock-balances.service';
import { StockBalancesController } from './stock-balances.controller';

@Module({
  controllers: [StockBalancesController],
  providers: [StockBalancesService],
})
export class StockBalancesModule {}
