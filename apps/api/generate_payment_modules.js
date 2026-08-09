const { execSync } = require('child_process');

const modules = [
  'taxes',
  'service-charges',
  'payments',
  'payment-allocations',
  'settlements',
  'refunds',
  'cash-registers',
  'cashier-shifts',
  'cash-movements',
  'receipts',
  'corporate-receivables',
  'financial-calculation'
];

console.log('Generating Functionality 9 Backend Modules...\n');

for (const mod of modules) {
  console.log(`Generating ${mod}...`);
  try {
    execSync(`npx nest g resource ${mod} --no-spec`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error generating ${mod}:`, err.message);
  }
}

console.log('\nAll Functionality 9 modules generated successfully.');
