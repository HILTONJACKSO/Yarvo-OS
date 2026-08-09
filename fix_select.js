const fs = require('fs');

const file = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\ui\\select.tsx';
let content = fs.readFileSync(file, 'utf8');

// SelectTrigger
content = content.replace(/bg-transparent/g, 'bg-slate-950');
content = content.replace(/border-input/g, 'border-slate-800');
content = content.replace(/text-muted-foreground/g, 'text-slate-400');

// SelectContent
content = content.replace(/bg-popover/g, 'bg-slate-900');
content = content.replace(/text-popover-foreground/g, 'text-slate-50');
content = content.replace(/ring-foreground\/10/g, 'ring-slate-800');

// SelectItem
content = content.replace(/focus:bg-accent/g, 'focus:bg-slate-800');
content = content.replace(/focus:text-accent-foreground/g, 'focus:text-slate-50');
content = content.replace(/text-accent-foreground/g, 'text-slate-50');

// SelectSeparator
content = content.replace(/bg-border/g, 'bg-slate-800');

fs.writeFileSync(file, content);
console.log("Select component hardcoded with dark theme!");
