const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/User/Music/Yarvo-Hotel/apps/web/app/dashboard/customers');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace \` with `
  content = content.replace(/\\`/g, '`');
  // Replace \$ with $
  content = content.replace(/\\\$/g, '$');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed syntax escaping in', file);
  }
});
