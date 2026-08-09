const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

function addId(filename, searchStr, idStr) {
  const file = path.join(srcDir, filename);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes(`id="${idStr}"`)) {
    content = content.replace(searchStr, `${searchStr.replace('className', `id="${idStr}" className`)}`);
    fs.writeFileSync(file, content);
  }
}

addId('property-types.tsx', '<section className="py-24', 'features');
addId('about-section.tsx', '<section className="py-24', 'about');
addId('pwa-section.tsx', '<section className="py-24', 'pwa');

console.log("IDs injected!");
