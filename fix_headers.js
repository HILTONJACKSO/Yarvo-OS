const fs = require('fs');
const path = require('path');
function walk(d) {
  let r = [];
  fs.readdirSync(d).forEach(f => {
    f = path.join(d, f);
    if(fs.statSync(f).isDirectory()) {
      r = r.concat(walk(f));
    } else if(f.endsWith('.tsx')) {
      r.push(f);
    }
  });
  return r;
}
const files = walk('apps/web/app/dashboard/property');
let c = 0;
files.forEach(file => {
  let text = fs.readFileSync(file, 'utf8');
  let original = text;
  text = text.replace(/'x-branch-id': ([^}]+) }/g, (match, p1) => {
    if(match.includes('x-business-id')) return match;
    return `'x-branch-id': ${p1}, 'x-business-id': businessId }`;
  });
  if(text !== original) {
    fs.writeFileSync(file, text);
    c++;
  }
});
console.log('Updated ' + c);
