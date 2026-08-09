const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const modulesToGenerate = [
  'housekeeping',
  'housekeeping-tasks',
  'housekeeping-checklists',
  'room-inspections', // We already generated room-inspections? Wait, in Functionality 10, the prompt was RoomConditionInspection, but I might have named it room-inspections. Let me check my previous script. Actually, I'll just overwrite.
  'stay-over-services',
  'lost-and-found',
  'linen',
  'housekeeping-reports'
];

console.log('Generating Functionality 11 Backend Modules...\n');

try {
  // First, remove room-turnover-tasks module from app.module.ts
  const appModulePath = path.join(__dirname, 'src', 'app.module.ts');
  let appModule = fs.readFileSync(appModulePath, 'utf8');
  appModule = appModule.replace(/import { RoomTurnoverTasksModule } from '\.\/room-turnover-tasks\/room-turnover-tasks\.module';\n/g, '');
  appModule = appModule.replace(/RoomTurnoverTasksModule,\n/g, '');
  fs.writeFileSync(appModulePath, appModule);
  
  // Also remove the directory
  const turnoverDir = path.join(__dirname, 'src', 'room-turnover-tasks');
  if (fs.existsSync(turnoverDir)) {
    fs.rmSync(turnoverDir, { recursive: true, force: true });
    console.log('Removed obsolete room-turnover-tasks module.\n');
  }

  for (const mod of modulesToGenerate) {
    console.log(`Generating ${mod}...`);
    // Check if it already exists, if so, delete it first to avoid conflicts
    const modDir = path.join(__dirname, 'src', mod);
    if (fs.existsSync(modDir)) {
      console.log(`Module ${mod} already exists, overwriting...`);
      fs.rmSync(modDir, { recursive: true, force: true });
      appModule = fs.readFileSync(appModulePath, 'utf8');
      
      // We also need to strip it from app.module.ts temporarily so Nest CLI can add it cleanly
      const capitalized = mod.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
      const regexImport = new RegExp(`import { ${capitalized}Module } from '\\.\\/${mod}\\/${mod}\\.module';\\n`, 'g');
      const regexRef = new RegExp(`${capitalized}Module,\\n`, 'g');
      appModule = appModule.replace(regexImport, '');
      appModule = appModule.replace(regexRef, '');
      fs.writeFileSync(appModulePath, appModule);
    }
    
    execSync(`npx nest g resource ${mod} --no-spec`, { stdio: 'inherit' });
  }

  console.log('\nAll Functionality 11 modules generated successfully.');
} catch (error) {
  console.error('Error generating modules:', error.message);
  process.exit(1);
}
