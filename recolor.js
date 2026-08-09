const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

const colorMap = [
  { regex: /\btext-(emerald|purple|amber|pink|indigo|orange|teal|cyan|rose)-[456]00\b/g, replacement: 'text-blue-600' },
  { regex: /\bbg-(emerald|purple|amber|pink|indigo|orange|teal|cyan|rose)-[5]0\b/g, replacement: 'bg-blue-50' },
  { regex: /\bbg-(emerald|purple|amber|pink|indigo|orange|teal|cyan|rose)-100\b/g, replacement: 'bg-blue-100' },
  { regex: /\bborder-(emerald|purple|amber|pink|indigo|orange|teal|cyan|rose)-[23]00\b/g, replacement: 'border-blue-200' },
  { regex: /\bborder-(emerald|purple|amber|pink|indigo|orange|teal|cyan|rose)-[45]00\b/g, replacement: 'border-blue-500' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  colorMap.forEach(mapping => {
    content = content.replace(mapping.regex, mapping.replacement);
  });

  // Specifically fix some elements that shouldn't be fully blue if they need to be slate for contrast
  // But overall, replacing the "rainbow" colors with blue/slate is the goal.
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${filePath}`);
  }
}

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(dir, file));
  }
});
