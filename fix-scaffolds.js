const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // For scaffolded services that have `findAll() {` without async
  content = content.replace(/findAll\(\)\s*\{/g, `findAll(businessId?: string) {`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function findFiles(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      findFiles(file);
    } else if (file.endsWith('.service.ts')) {
      processFile(file);
    }
  });
}

console.log('Running scaffold fix script...');
findFiles('./apps/api/src');
console.log('Done.');
