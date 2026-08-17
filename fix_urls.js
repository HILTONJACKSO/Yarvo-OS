const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            if (file.includes('node_modules') || file.includes('.next') || file.includes('.git')) return;
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'apps/web'));
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace hardcoded URLs wrapped in single quotes
    content = content.replace(/'http:\/\/127\.0\.0\.1:3002([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    // Replace hardcoded URLs wrapped in double quotes
    content = content.replace(/"http:\/\/127\.0\.0\.1:3002([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    // Replace any remaining http://127.0.0.1:3002 (e.g. inside backticks)
    content = content.replace(/http:\/\/127\.0\.0\.1:3002/g, '${process.env.NEXT_PUBLIC_API_URL}');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
    }
});

console.log(`Updated ${changedCount} files.`);
