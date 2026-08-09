const { execSync } = require('child_process');
const fs = require('fs');

const API_DIR = 'C:/Users/User/Music/Yarvo-Hotel/apps/api';

const commands = [
  // 1. Admissions Module (Main wrapper)
  'npx nest g module admissions',
  
  // 2. Venues Module
  'npx nest g module admissions/venues',
  'npx nest g controller admissions/venues',
  'npx nest g service admissions/venues',
  
  // 3. Tickets Module
  'npx nest g module admissions/tickets',
  'npx nest g controller admissions/tickets',
  'npx nest g service admissions/tickets',
  
  // 4. GateControl Module
  'npx nest g module admissions/gate-control',
  'npx nest g controller admissions/gate-control',
  'npx nest g service admissions/gate-control',
  
  // 5. Attendance Module
  'npx nest g module admissions/attendance',
  'npx nest g controller admissions/attendance',
  'npx nest g service admissions/attendance',
  
  // 6. Membership Module
  'npx nest g module admissions/memberships',
  'npx nest g controller admissions/memberships',
  'npx nest g service admissions/memberships',
  
  // 7. Specialized Services inside GateControl and Attendance
  'npx nest g service admissions/gate-control/ticket-validation --flat',
  'npx nest g service admissions/attendance/capacity-control --flat',
  
  // 8. QRCode Module
  'npx nest g module admissions/qrcode',
  'npx nest g service admissions/qrcode'
];

console.log('Starting Admissions backend generation...');

for (const cmd of commands) {
  try {
    console.log(`Executing: ${cmd}`);
    execSync(cmd, { cwd: API_DIR, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${cmd}:`, error.message);
  }
}

console.log('Generation completed.');
