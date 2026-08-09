const fs = require('fs');
const path = require('path');

const inventoryDir = path.join(__dirname, 'apps/web/app/dashboard/inventory');

const pagesToUpdate = [
  { file: 'items/page.tsx', stateName: 'items', endpoint: 'items' },
  { file: 'stock-levels/page.tsx', stateName: 'levels', endpoint: 'stock-levels' },
  { file: 'movements/page.tsx', stateName: 'movements', endpoint: 'movements' },
  { file: 'transfers/new/page.tsx', stateName: 'transfers', endpoint: 'transfers' },
  { file: 'recipes/page.tsx', stateName: 'recipes', endpoint: 'recipes' },
  { file: 'counts/page.tsx', stateName: 'counts', endpoint: 'counts' },
  { file: 'waste/page.tsx', stateName: 'waste', endpoint: 'waste' },
  { file: 'issues/new/page.tsx', stateName: 'categories', endpoint: 'categories' },
  { file: 'units/page.tsx', stateName: 'units', endpoint: 'units' },
  { file: 'locations/page.tsx', stateName: 'locations', endpoint: 'locations' },
];

pagesToUpdate.forEach(({ file, stateName, endpoint }) => {
  const filePath = path.join(inventoryDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Add useEffect to react imports if not present
  if (content.includes("import { useState } from 'react';")) {
    content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
  } else if (content.includes("import { useState, useEffect } from 'react';")) {
    // already there
  } else {
    // maybe it has no useState, which is weird
  }

  // Replace the useState block
  const regex = new RegExp(`const \\\[${stateName}(?:,\\s*set[A-Z][a-zA-Z0-9]*)*\\\]\\s*=\\s*useState(?:<any\\\[\\\]>)?\\\(\\\s*\\\[[\\s\\S]*?\\\]\\s*\\\);`);
  
  const replacement = `const [${stateName}, set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/inventory/${endpoint}\`);
      if (response.ok) {
        const data = await response.json();
        set${stateName.charAt(0).toUpperCase() + stateName.slice(1)}(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const { io } = require('socket.io-client');
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');
    socket.on('inventory.updated', () => fetchData());
    return () => socket.disconnect();
  }, []);`;

  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Regex did not match for ${file}`);
  }
});
