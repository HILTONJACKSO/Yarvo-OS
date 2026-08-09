const fs = require('fs');
function fixFile(p) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/onValueChange=\{v => set(\w+)\(\{([^}]*?):\s*v\}\)\}/g, 'onValueChange={v => set$1({$2: v || \'\'})}');
  c = c.replace(/dayOfWeek: parseInt\(v\)/g, 'dayOfWeek: parseInt(v || \'1\')');
  c = c.replace(/status: v\s*\}\)/g, 'status: v || \'\'})');
  c = c.replace(/type: v\s*\}\)/g, 'type: v || \'\'})');
  c = c.replace(/shape: v\s*\}\)/g, 'shape: v || \'\'})');
  c = c.replace(/reason: v\s*\}\)/g, 'reason: v || \'\'})');
  c = c.replace(/roomTypeId: v\s*\}\)/g, 'roomTypeId: v || \'\'})');
  c = c.replace(/roomId: v\s*\}\)/g, 'roomId: v || \'\'})');
  fs.writeFileSync(p, c);
}
fixFile('apps/web/app/dashboard/property/hours/page.tsx');
fixFile('apps/web/app/dashboard/property/rooms/page.tsx');
fixFile('apps/web/app/dashboard/property/tables/page.tsx');
fixFile('apps/web/app/dashboard/rooms/blocks/page.tsx');
