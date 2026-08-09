const { execSync } = require('child_process');

const modules = [
  'checkouts',
  'checkout-review',
  'checkout-adjustments',
  'room-inspections',
  'room-damages',
  'charge-transfers',
  'guest-invoices',
  'receivables',
  'guest-feedback',
  'room-turnover-tasks'
];

console.log('Generating Functionality 10 Backend Modules...\n');

for (const mod of modules) {
  console.log(`Generating ${mod}...`);
  try {
    execSync(`npx nest g resource ${mod} --no-spec`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error generating ${mod}:`, err.message);
  }
}

console.log('\nAll Functionality 10 modules generated successfully.');
