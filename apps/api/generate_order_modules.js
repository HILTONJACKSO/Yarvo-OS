const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const modules = [
  'orders',
  'order-items',
  'order-rounds',
  'preparation-stations',
  'preparation-tickets',
  'kitchen-display',
  'bar-display',
  'room-service-orders',
  'table-occupancy',
  'order-transfers',
  'order-merging',
  'order-folio-posting',
  'order-delivery',
  'order-websocket'
];

console.log('Generating Functionality 8 Backend Modules...');

try {
  for (const mod of modules) {
    console.log(`\nGenerating ${mod}...`);
    // Generate the module
    execSync(`npx nest g module ${mod}`, { stdio: 'inherit' });
    
    if (mod !== 'order-websocket') {
        // Generate the controller and service for standard REST modules
        execSync(`npx nest g controller ${mod}`, { stdio: 'inherit' });
        execSync(`npx nest g service ${mod}`, { stdio: 'inherit' });
    } else {
        // For websockets, we might just generate a gateway, but Nest CLI supports 'gateway'
        try {
            execSync(`npx nest g gateway ${mod}`, { stdio: 'inherit' });
        } catch (e) {
            console.log(`Could not generate gateway for ${mod}, skipping...`);
        }
    }
  }
  console.log('\nAll Functionality 8 modules generated successfully.');
} catch (error) {
  console.error('Error generating modules:', error.message);
  process.exit(1);
}
