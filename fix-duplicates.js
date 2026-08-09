const fs = require('fs');
const path = require('path');

const files = [
  'counts/page.tsx',
  'items/page.tsx',
  'locations/page.tsx',
  'movements/page.tsx',
  'recipes/page.tsx',
  'stock-levels/page.tsx',
  'units/page.tsx',
  'waste/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, 'apps/web/app/dashboard/inventory', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the string "const [loading, setLoading] = useState(true);"
  const duplicateStart = "  const [loading, setLoading] = useState(true);\n\n  const fetchData = async () => {";
  
  const firstIndex = content.indexOf(duplicateStart);
  if (firstIndex !== -1) {
    const secondIndex = content.indexOf(duplicateStart, firstIndex + 1);
    if (secondIndex !== -1) {
      // It is duplicated. Let's find the end of the second block (the end of the useEffect)
      const endString = "  }, []);\n";
      const endOfSecondBlock = content.indexOf(endString, secondIndex) + endString.length;
      
      // Remove the second block completely
      content = content.substring(0, secondIndex) + content.substring(endOfSecondBlock);
      fs.writeFileSync(filePath, content);
      console.log(`Fixed ${file}`);
    } else {
      console.log(`${file} not duplicated`);
    }
  }
});
