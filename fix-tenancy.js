const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  const isController = filePath.endsWith('.controller.ts');
  const isService = filePath.endsWith('.service.ts');

  if (isController) {
    // Add Headers import if missing
    if (!content.includes("import {") || !content.includes("Headers")) {
        if(content.includes("@nestjs/common")) {
             content = content.replace(/import\s+{([^}]*)}\s+from\s+'@nestjs\/common';/, (match, p1) => {
                 if(!p1.includes('Headers')) return `import { ${p1.trim()}, Headers } from '@nestjs/common';`;
                 return match;
             });
        }
    }

    // Replace findAll() { return this.xService.findAll(); }
    // Note: this handles empty findAll()
    content = content.replace(/findAll\(\)\s*\{\s*return\s+this\.(\w+)\.findAll\(\);\s*\}/g, 
        `findAll(@Headers('x-business-id') businessId: string) {
    if (!businessId) return [];
    return this.$1.findAll(businessId);
  }`);

  } else if (isService) {
    // Replace async findAll() { return this.prisma.x.findMany({ ... }) }
    // We add businessId?: string and where: { businessId }
    content = content.replace(/async\s+findAll\(\)\s*\{/g, `async findAll(businessId?: string) {`);
    
    // Find all Prisma findMany calls that don't have where yet
    // This is tricky via regex, let's just do a simpler replace for the immediate pattern:
    // return this.prisma.model.findMany({
    // Or return this.prisma.model.findMany()
    
    // Let's use a simpler heuristic for services.
    // If we changed async findAll() to async findAll(businessId?: string), we need to inject the where clause.
    if (content !== original) {
        // We know we updated findAll(). Let's find the findMany block inside it.
        // A safer way is to just replace `findMany({` with `findMany({ where: businessId ? { businessId } : {},` 
        // But only inside findAll.
        
        const findAllRegex = /async\s+findAll\(businessId\?\:\s*string\)\s*\{([\s\S]*?)this\.prisma\.(\w+)\.findMany\(([\s\S]*?)\}/;
        const match = content.match(findAllRegex);
        if (match) {
            let inside = match[3];
            if (inside.includes('where:')) {
                // If it already has where, we inject businessId
                content = content.replace(
                    /(async\s+findAll\(businessId\?\:\s*string\)\s*\{[\s\S]*?this\.prisma\.\w+\.findMany\(\{[\s\S]*?where:\s*\{)/,
                    `$1 businessId, `
                );
            } else if (inside.trim() === '') {
                // findMany()
                content = content.replace(
                    /(async\s+findAll\(businessId\?\:\s*string\)\s*\{[\s\S]*?this\.prisma\.\w+\.findMany\()\)/,
                    `$1{ where: businessId ? { businessId } : undefined })`
                );
            } else {
                // findMany({ ... })
                content = content.replace(
                    /(async\s+findAll\(businessId\?\:\s*string\)\s*\{[\s\S]*?this\.prisma\.\w+\.findMany\(\{)/,
                    `$1 where: businessId ? { businessId } : undefined, `
                );
            }
        }
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function findFiles(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      findFiles(file);
    } else if (file.endsWith('.controller.ts') || file.endsWith('.service.ts')) {
      processFile(file);
    }
  });
}

console.log('Running tenancy fix script...');
findFiles('./apps/api/src');
console.log('Done.');
