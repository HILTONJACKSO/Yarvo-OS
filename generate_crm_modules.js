const { execSync } = require('child_process');

const modules = [
  'crm',
  'crm/customers',
  'crm/preferences',
  'crm/timeline',
  'crm/communications',
  'crm/feedback',
  'crm/complaints',
  'crm/corporate',
  'crm/vip',
  'crm/analytics'
];

console.log('Starting CRM backend generation...');

for (const mod of modules) {
  try {
    console.log("Executing: npx nest g module " + mod);
    execSync("npx nest g module " + mod, { stdio: 'inherit', cwd: './apps/api' });

    if (mod !== 'crm') {
      console.log("Executing: npx nest g controller " + mod);
      execSync("npx nest g controller " + mod, { stdio: 'inherit', cwd: './apps/api' });

      console.log("Executing: npx nest g service " + mod);
      execSync("npx nest g service " + mod, { stdio: 'inherit', cwd: './apps/api' });
    }
  } catch (error) {
    console.error("Failed to generate for " + mod, error.message);
  }
}

console.log('CRM generation completed.');
