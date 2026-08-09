import { Module } from '@nestjs/common';
import { CashierShiftsService } from './cashier-shifts.service';
import { CashierShiftsController } from './cashier-shifts.controller';

@Module({
  controllers: [CashierShiftsController],
  providers: [CashierShiftsService],
})
export class CashierShiftsModule {}
