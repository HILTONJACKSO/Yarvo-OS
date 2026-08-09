const { execSync } = require('child_process');

console.log('Starting Finance & Accounting backend generation...');

const commands = [
  // 1. Finance Parent Module
  'npx nest g module finance',
  
  // 2. General Ledger
  'npx nest g module finance/ledger',
  'npx nest g controller finance/ledger',
  'npx nest g service finance/ledger',

  // 3. Chart of Accounts
  'npx nest g module finance/accounts',
  'npx nest g controller finance/accounts',
  'npx nest g service finance/accounts',

  // 4. Banking
  'npx nest g module finance/banking',
  'npx nest g controller finance/banking',
  'npx nest g service finance/banking',

  // 5. Invoicing (Receivables/Payables)
  'npx nest g module finance/invoices',
  'npx nest g controller finance/invoices',
  'npx nest g service finance/invoices',

  // 6. Fixed Assets & Depreciation
  'npx nest g module finance/assets',
  'npx nest g controller finance/assets',
  'npx nest g service finance/assets',

  // 7. Budgets
  'npx nest g module finance/budgets',
  'npx nest g controller finance/budgets',
  'npx nest g service finance/budgets',

  // 8. Financial Reports (P&L, Balance Sheet, Cash Flow)
  'npx nest g module finance/reports',
  'npx nest g controller finance/reports',
  'npx nest g service finance/reports',

  // 9. Business Intelligence (Executive Dashboard)
  'npx nest g module finance/bi',
  'npx nest g controller finance/bi',
  'npx nest g service finance/bi'
];

for (const cmd of commands) {
  try {
    console.log(`Executing: ${cmd}`);
    // Run from the apps/api directory
    execSync(cmd, { cwd: './apps/api', stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute: ${cmd}`);
    console.error(error.message);
  }
}

console.log('Finance generation completed.');
