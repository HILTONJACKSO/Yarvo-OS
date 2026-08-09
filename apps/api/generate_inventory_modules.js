const { execSync } = require('child_process');
const fs = require('fs');

const resources = [
  'inventory',
  'inventory-items',
  'stock-locations',
  'stock-balances',
  'stock-movements',
  'stock-transfers',
  'department-issues',
  'recipes',
  'inventory-consumption',
  'inventory-waste',
  'inventory-batches',
  'stock-counts',
  'suppliers',
  'purchase-requests',
  'purchase-orders',
  'goods-receipts',
  'supplier-invoices',
  'inventory-reports',
  'purchasing-reports'
];

console.log('Generating inventory and purchasing modules...');

for (const res of resources) {
  try {
    console.log(`\nGenerating ${res}...`);
    execSync(`npx nest g resource ${res} --no-spec`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to generate ${res}:`, error.message);
  }
}

console.log('\nAll inventory modules generated successfully!');
