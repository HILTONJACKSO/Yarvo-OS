const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Backgrounds
  content = content.replace(/\bbg-white\b/g, 'bg-slate-950');
  content = content.replace(/\bbg-slate-50\b/g, 'bg-slate-900');
  content = content.replace(/\bbg-slate-100\b/g, 'bg-slate-800');
  content = content.replace(/\bbg-gray-50\b/g, 'bg-slate-900');
  content = content.replace(/\bbg-gray-100\b/g, 'bg-slate-800');

  // Borders
  content = content.replace(/\bborder-slate-100\b/g, 'border-slate-800');
  content = content.replace(/\bborder-slate-200\b/g, 'border-slate-800');
  content = content.replace(/\bborder-slate-300\b/g, 'border-slate-700');
  content = content.replace(/\bborder-gray-200\b/g, 'border-slate-800');
  content = content.replace(/\bdivide-slate-200\b/g, 'divide-slate-800');

  // Text
  content = content.replace(/\btext-slate-900\b/g, 'text-slate-50');
  content = content.replace(/\btext-slate-800\b/g, 'text-slate-200');
  content = content.replace(/\btext-slate-700\b/g, 'text-slate-300');
  content = content.replace(/\btext-slate-600\b/g, 'text-slate-300');
  content = content.replace(/\btext-slate-500\b/g, 'text-slate-400');
  content = content.replace(/\btext-gray-900\b/g, 'text-slate-50');
  content = content.replace(/\btext-gray-500\b/g, 'text-slate-400');

  // Button/Interactive Hover States
  content = content.replace(/\bhover:bg-slate-50\b/g, 'hover:bg-slate-800');
  content = content.replace(/\bhover:bg-slate-100\b/g, 'hover:bg-slate-700');
  content = content.replace(/\bhover:bg-gray-50\b/g, 'hover:bg-slate-800');
  content = content.replace(/\bhover:text-slate-900\b/g, 'hover:text-slate-50');

  // Status Badges (Glassmorphism dark theme mapping)
  // Emerald / Success
  content = content.replace(/\bbg-emerald-100\b/g, 'bg-emerald-500/10');
  content = content.replace(/\bbg-green-100\b/g, 'bg-emerald-500/10');
  content = content.replace(/\btext-emerald-800\b/g, 'text-emerald-400');
  content = content.replace(/\btext-green-800\b/g, 'text-emerald-400');
  
  // Red / Danger
  content = content.replace(/\bbg-red-100\b/g, 'bg-red-500/10');
  content = content.replace(/\btext-red-800\b/g, 'text-red-400');
  
  // Amber / Warning
  content = content.replace(/\bbg-amber-100\b/g, 'bg-amber-500/10');
  content = content.replace(/\bbg-yellow-100\b/g, 'bg-amber-500/10');
  content = content.replace(/\btext-amber-800\b/g, 'text-amber-400');
  content = content.replace(/\btext-yellow-800\b/g, 'text-amber-400');

  // Blue / Info (which is our brand primary, but for badges we can keep it blue or use brand green)
  content = content.replace(/\bbg-blue-100\b/g, 'bg-blue-500/10');
  content = content.replace(/\btext-blue-800\b/g, 'text-blue-400');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      processFile(filePath);
    }
  }
}

walkDir('C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\app\\dashboard');
