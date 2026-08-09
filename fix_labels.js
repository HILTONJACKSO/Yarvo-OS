const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const dirs = [
  'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\app\\dashboard',
  'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components'
];

let files = [];
dirs.forEach(dir => files = files.concat(walk(dir)));

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace dark gray/slate text colors inside Label or label tags
    content = content.replace(/(<Label[^>]*className="[^"]*)text-gray-700([^"]*")/g, '$1text-slate-300$2');
    content = content.replace(/(<Label[^>]*className="[^"]*)text-gray-600([^"]*")/g, '$1text-slate-300$2');
    content = content.replace(/(<Label[^>]*className="[^"]*)text-slate-700([^"]*")/g, '$1text-slate-300$2');
    
    content = content.replace(/(<label[^>]*className="[^"]*)text-gray-700([^"]*")/g, '$1text-slate-300$2');
    content = content.replace(/(<label[^>]*className="[^"]*)text-gray-600([^"]*")/g, '$1text-slate-300$2');
    content = content.replace(/(<label[^>]*className="[^"]*)text-slate-700([^"]*")/g, '$1text-slate-300$2');
    
    // Fix optional spans inside label
    content = content.replace(/<span className="text-gray-400([^"]*)">/g, '<span className="text-slate-500$1">');
    content = content.replace(/<span className="text-gray-500([^"]*)">/g, '<span className="text-slate-500$1">');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log("Updated: " + file);
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} files.`);
