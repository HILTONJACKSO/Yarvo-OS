const fs = require('fs');
const path = require('path');

const footerPath = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing\\footer.tsx';
let content = fs.readFileSync(footerPath, 'utf8');

const replacements = {
  // Product
  '>Features<': ' href="#features">Features<',
  '>Pricing<': ' href="#pricing">Pricing<',
  '>Hardware Setup<': ' href="/register">Hardware Setup<',
  '>Progressive Web App <': ' href="#pwa">Progressive Web App <',
  '>Updates<': ' href="/register">Updates<',
  
  // Solutions
  '>For Hotels & Resorts<': ' href="/register">For Hotels & Resorts<',
  '>For Restaurants & Cafes<': ' href="/register">For Restaurants & Cafes<',
  '>For Bars & Nightclubs<': ' href="/register">For Bars & Nightclubs<',
  '>For Beaches & Pools<': ' href="/register">For Beaches & Pools<',
  '>For Event Centers<': ' href="/register">For Event Centers<',

  // Resources
  '>Help Center<': ' href="mailto:support@yarvohotel.com">Help Center<',
  '>Video Tutorials<': ' href="https://youtube.com">Video Tutorials<',
  '>API Documentation<': ' href="mailto:support@yarvohotel.com">API Documentation<',
  '>Developer Portal<': ' href="mailto:support@yarvohotel.com">Developer Portal<',
  '>Community<': ' href="mailto:support@yarvohotel.com">Community<',

  // Company
  '>About Us<': ' href="#about">About Us<',
  '>Careers<': ' href="mailto:jobs@yarvohotel.com">Careers<',
  '>Contact Sales<': ' href="mailto:sales@yarvohotel.com">Contact Sales<',
  '>Privacy Policy<': ' href="/privacy">Privacy Policy<',
  '>Terms of Service<': ' href="/terms">Terms of Service<',
  
  // Socials / other
  'href="#" className="w-10 h-10 rounded-full': 'href="mailto:hello@yarvohotel.com" className="w-10 h-10 rounded-full',
  '>Status Page<': ' href="mailto:support@yarvohotel.com">Status Page<'
};

for (const [key, value] of Object.entries(replacements)) {
  // We need to replace `href="#"... >Name<` with `href="..." ... >Name<`
  // Actually, simpler: replace `href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Name<` 
  // Let's just use regex to match the exact name and inject the href.
  
  const name = key.replace('>', '').replace('<', '');
  const regex = new RegExp(`href="#"( className="[^"]+")>${name}<`, 'g');
  const newHref = value.match(/href="([^"]+)"/)[1];
  
  content = content.replace(regex, `href="${newHref}"$1>${name}<`);
  
  // For 'Progressive Web App ' which has a span inside
  if (name === 'Progressive Web App ') {
    content = content.replace(/href="#"( className="[^"]+ flex items-center gap-2")>Progressive Web App <span/g, `href="${newHref}"$1>Progressive Web App <span`);
  }
}

// Ensure the #pricing, #about, #features, #pwa anchors actually exist in page.tsx or components
// I will just add the ids to the sections directly in footer logic? No, they belong in the components.
fs.writeFileSync(footerPath, content);
console.log("Footer links updated!");
