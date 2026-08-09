const { execSync } = require('child_process');

const resources = [
  'availability',
  'reservations',
  'reservation-pricing',
  'reservation-deposits',
  'room-blocks',
  'reservation-waitlist',
  'online-booking-requests'
];

resources.forEach(res => {
  try {
    console.log(`Generating module: ${res}`);
    execSync(`npx nest g module ${res} --no-spec`, { stdio: 'inherit' });
    if (res !== 'reservation-pricing') { // Pricing might just be a service, no controller needed maybe?
      console.log(`Generating controller: ${res}`);
      execSync(`npx nest g controller ${res} --no-spec`, { stdio: 'inherit' });
    }
    console.log(`Generating service: ${res}`);
    execSync(`npx nest g service ${res} --no-spec`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error generating ${res}:`, err.message);
  }
});
console.log('Finished generating modules!');
