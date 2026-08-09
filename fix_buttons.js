const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

// 1. Fix hero-section.tsx
const heroPath = path.join(srcDir, 'hero-section.tsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');
heroContent = heroContent.replace(/href="#demo"/g, 'href="mailto:demo@yarvohotel.com"');
fs.writeFileSync(heroPath, heroContent);

// 2. Fix navigation.tsx
const navPath = path.join(srcDir, 'navigation.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');
navContent = navContent.replace(/href="#demo"/g, 'href="mailto:demo@yarvohotel.com"');
fs.writeFileSync(navPath, navContent);

// 3. Fix pricing-section.tsx
const pricingPath = path.join(srcDir, 'pricing-section.tsx');
let pricingContent = fs.readFileSync(pricingPath, 'utf8');
if (!pricingContent.includes("import Link")) {
  pricingContent = pricingContent.replace('import { CheckIcon', 'import Link from "next/link";\nimport { CheckIcon');
}
pricingContent = pricingContent.replace(
  /<button className=\{`w-full py-3\.5 rounded-xl font-bold transition-all mb-8 \$\{plan\.buttonStyle\}`\}>\s*\{plan\.buttonText\}\s*<\/button>/g,
  `<Link href={plan.buttonText === 'Contact Sales' ? 'mailto:sales@yarvohotel.com' : '/register'} className={\`block text-center w-full py-3.5 rounded-xl font-bold transition-all mb-8 \${plan.buttonStyle}\`}>\n                {plan.buttonText}\n              </Link>`
);
fs.writeFileSync(pricingPath, pricingContent);

console.log("Buttons fixed!");
