const { execSync } = require('child_process');

const modules = [
  'catalog',
  'catalog-categories',
  'catalog-items',
  'catalog-variations',
  'catalog-modifiers',
  'menus',
  'menu-builder',
  'catalog-availability',
  'price-lists',
  'packages',
  'catalog-import',
  'catalog-pricing'
];

for (const mod of modules) {
  console.log(`Generating ${mod}...`);
  try {
    execSync(`npx nest g module ${mod} --no-spec`, { stdio: 'inherit' });
    execSync(`npx nest g controller ${mod} --no-spec`, { stdio: 'inherit' });
    execSync(`npx nest g service ${mod} --no-spec`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to generate ${mod}`, err.message);
  }
}
console.log('All modules generated successfully.');
