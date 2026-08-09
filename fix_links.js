const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

function fixFile(filename) {
  const filePath = path.join(srcDir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <Link href="mailto:..." ...> ... </Link> with <a>...</a>
  content = content.replace(/<Link([^>]+href="mailto:[^"]+"[^>]*)>([\s\S]*?)<\/Link>/g, '<a$1>$2</a>');
  
  // Replace <Link href="https:..." ...> ... </Link> with <a>...</a>
  content = content.replace(/<Link([^>]+href="https?:[^"]+"[^>]*)>([\s\S]*?)<\/Link>/g, '<a$1>$2</a>');

  // For pricing-section.tsx specifically, since it uses dynamic href:
  if (filename === 'pricing-section.tsx') {
    // Revert the previous dynamic Link and use conditional rendering
    const badLinkPattern = /<Link href=\{plan\.buttonText === 'Contact Sales' \? 'mailto:sales@yarvohotel\.com' : '\/register'\} className=\{\`block text-center w-full py-3\.5 rounded-xl font-bold transition-all mb-8 \$\{plan\.buttonStyle\}\`\}>\s*\{plan\.buttonText\}\s*<\/Link>/g;
    
    const replacement = `{plan.buttonText === 'Contact Sales' ? (
                <a href="mailto:sales@yarvohotel.com" className={\`block text-center w-full py-3.5 rounded-xl font-bold transition-all mb-8 \${plan.buttonStyle}\`}>
                  {plan.buttonText}
                </a>
              ) : (
                <Link href="/register" className={\`block text-center w-full py-3.5 rounded-xl font-bold transition-all mb-8 \${plan.buttonStyle}\`}>
                  {plan.buttonText}
                </Link>
              )}`;
    content = content.replace(badLinkPattern, replacement);
  }

  fs.writeFileSync(filePath, content);
}

['hero-section.tsx', 'navigation.tsx', 'footer.tsx', 'pricing-section.tsx'].forEach(fixFile);

console.log("Links fixed!");
