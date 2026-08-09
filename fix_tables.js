const fs = require('fs');

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

const files = walk('C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\app\\dashboard');

let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Text colors
    content = content.replace(/text-gray-900/g, 'text-slate-50');
    content = content.replace(/text-gray-800/g, 'text-slate-200');
    content = content.replace(/text-gray-700/g, 'text-slate-300');
    content = content.replace(/text-gray-600/g, 'text-slate-400');
    content = content.replace(/text-gray-500/g, 'text-slate-400');
    
    content = content.replace(/text-slate-900/g, 'text-slate-50');
    content = content.replace(/text-slate-800/g, 'text-slate-200');
    content = content.replace(/text-slate-700/g, 'text-slate-300');
    content = content.replace(/text-slate-600/g, 'text-slate-400');

    // Borders
    content = content.replace(/border-gray-100/g, 'border-slate-800');
    content = content.replace(/border-gray-200/g, 'border-slate-800');
    content = content.replace(/border-gray-300/g, 'border-slate-700');
    
    // Backgrounds (often used in tables/cards)
    content = content.replace(/bg-gray-50/g, 'bg-slate-900/50');
    
    // Don't replace pure bg-white globally yet just in case it breaks SVGs, 
    // but replacing it in typical class strings is useful.
    content = content.replace(/bg-white/g, 'bg-slate-950');

    if (content !== original) {
        fs.writeFileSync(file, content);
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} files.`);
