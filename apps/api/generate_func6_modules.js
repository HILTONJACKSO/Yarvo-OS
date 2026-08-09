const { execSync } = require('child_process');

const modules = [
  'stays',
  'check-in',
  'stay-occupants',
  'room-transfers',
  'guest-folios',
  'folio-entries',
  'guest-requests'
];

try {
  for (const mod of modules) {
    console.log(`Generating module: ${mod}`);
    execSync(`npx nest g module ${mod}`, { stdio: 'inherit' });
    execSync(`npx nest g controller ${mod}`, { stdio: 'inherit' });
    execSync(`npx nest g service ${mod}`, { stdio: 'inherit' });
  }
  console.log('All modules generated successfully.');
} catch (error) {
  console.error('Error generating modules:', error.message);
}
