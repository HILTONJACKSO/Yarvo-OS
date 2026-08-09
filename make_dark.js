const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/\bbg-white\b/g, 'bg-slate-950');
  content = content.replace(/\bbg-slate-50\b/g, 'bg-slate-900');
  content = content.replace(/\bbg-slate-100\b/g, 'bg-slate-800');

  // Borders
  content = content.replace(/\bborder-slate-100\b/g, 'border-slate-800');
  content = content.replace(/\bborder-slate-200\b/g, 'border-slate-800');
  content = content.replace(/\bborder-slate-300\b/g, 'border-slate-700');

  // Text
  content = content.replace(/\btext-slate-900\b/g, 'text-slate-50');
  content = content.replace(/\btext-slate-800\b/g, 'text-slate-200');
  content = content.replace(/\btext-slate-700\b/g, 'text-slate-300');
  content = content.replace(/\btext-slate-600\b/g, 'text-slate-300');
  content = content.replace(/\btext-slate-500\b/g, 'text-slate-400');

  // Button Hover States
  content = content.replace(/\bhover:bg-slate-50\b/g, 'hover:bg-slate-800');
  content = content.replace(/\bhover:bg-slate-100\b/g, 'hover:bg-slate-700');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(dir, file));
  }
});
