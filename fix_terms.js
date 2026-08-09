const fs = require('fs');
const path = require('path');

const footerPath = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing\\footer.tsx';
let content = fs.readFileSync(footerPath, 'utf8');

if (!content.includes('import { TermsModal }')) {
  content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { TermsModal } from "@/components/landing/terms-modal";');
}

content = content.replace(
  /<li><Link href="\/terms"[^>]*>Terms of Service<\/Link><\/li>/g,
  '<li><TermsModal /></li>'
);

fs.writeFileSync(footerPath, content);
console.log("TermsModal injected into footer!");
