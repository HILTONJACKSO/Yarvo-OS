import { Module } from '@nestjs/common';
import { LedgerModule } from './ledger/ledger.module';
import { AccountsModule } from './accounts/accounts.module';
import { BankingModule } from './banking/banking.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AssetsModule } from './assets/assets.module';
import { BudgetsModule } from './budgets/budgets.module';
import { ReportsModule } from './reports/reports.module';
import { BiModule } from './bi/bi.module';
import { FinanceController } from './finance.controller';

@Module({
  imports: [LedgerModule, AccountsModule, BankingModule, InvoicesModule, AssetsModule, BudgetsModule, ReportsModule, BiModule],
  controllers: [FinanceController]
})
export class FinanceModule {}
