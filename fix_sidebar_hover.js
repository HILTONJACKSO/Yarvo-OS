const fs = require('fs');
const path = require('path');

const layoutPath = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\app\\dashboard\\layout.tsx';
let content = fs.readFileSync(layoutPath, 'utf8');

// 1. Top-level active states
content = content.replace(/'bg-slate-950\/10'/g, "'bg-slate-800 text-white shadow-sm'");

// 2. Top-level hover states
content = content.replace(/'hover:bg-slate-950\/5'/g, "'text-slate-300 hover:bg-slate-800/60 hover:text-white'");
content = content.replace(/hover:bg-slate-950\/5/g, "text-slate-300 hover:bg-slate-800/60 hover:text-white");

// 3. Sub-link hover states
// They currently look like: 'text-white font-medium' : 'hover:text-white'
// We will replace 'hover:text-white' with 'text-slate-400 hover:text-white hover:translate-x-1 transition-transform'
content = content.replace(/'hover:text-white'/g, "'text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200'");

// Sub-links that don't use the ternary (e.g. Settings, Activity)
content = content.replace(/hover:text-white rounded-md/g, "text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 rounded-md");

fs.writeFileSync(layoutPath, content, 'utf8');
console.log("Hover effects updated in layout.tsx");
