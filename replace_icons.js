const fs = require('fs');
const path = require('path');

const map = {
  Activity: "ChartBarIcon",
  AlertCircle: "ExclamationCircleIcon",
  AlertTriangle: "ExclamationTriangleIcon",
  ArrowDown: "ArrowDownIcon",
  ArrowRight: "ArrowRightIcon",
  BadgePercent: "TagIcon",
  Banknote: "BanknotesIcon",
  BarChart3: "ChartBarIcon",
  Bed: "HomeModernIcon",
  Bell: "BellIcon",
  Briefcase: "BriefcaseIcon",
  Building: "BuildingOfficeIcon",
  Building2: "BuildingOffice2Icon",
  Calculator: "CalculatorIcon",
  Calendar: "CalendarIcon",
  Camera: "CameraIcon",
  Check: "CheckIcon",
  CheckCircle2: "CheckCircleIcon",
  CheckSquare: "CheckIcon",
  ChefHat: "FireIcon",
  ChevronDown: "ChevronDownIcon",
  Clock: "ClockIcon",
  CloudSync: "CloudArrowUpIcon",
  CreditCard: "CreditCardIcon",
  Crown: "StarIcon",
  DatabaseBackup: "ServerIcon",
  DollarSign: "CurrencyDollarIcon",
  Download: "ArrowDownTrayIcon",
  FileSpreadsheet: "DocumentTextIcon",
  FileText: "DocumentIcon",
  Filter: "FunnelIcon",
  Fingerprint: "FingerPrintIcon",
  Github: "CodeBracketIcon",
  Globe2: "GlobeAltIcon",
  Heart: "HeartIcon",
  Info: "InformationCircleIcon",
  Key: "KeyIcon",
  Laptop: "ComputerDesktopIcon",
  Layers: "Square3Stack3DIcon",
  LayoutDashboard: "Squares2X2Icon",
  LineChart: "ChartBarSquareIcon",
  Lock: "LockClosedIcon",
  Mail: "EnvelopeIcon",
  Map: "MapIcon",
  MapPin: "MapPinIcon",
  Menu: "Bars3Icon",
  MonitorSmartphone: "DevicePhoneMobileIcon",
  MousePointerClick: "CursorArrowRaysIcon",
  Music: "MusicalNoteIcon",
  Network: "GlobeAltIcon",
  Package: "CubeIcon",
  Palmtree: "SunIcon",
  PartyPopper: "SparklesIcon",
  Phone: "PhoneIcon",
  PieChart: "ChartPieIcon",
  Plus: "PlusIcon",
  Printer: "PrinterIcon",
  QrCode: "QrCodeIcon",
  Receipt: "ReceiptPercentIcon",
  Search: "MagnifyingGlassIcon",
  Settings2: "Cog8ToothIcon",
  Shield: "ShieldCheckIcon",
  ShieldCheck: "ShieldCheckIcon",
  Shirt: "ShoppingBagIcon",
  ShoppingCart: "ShoppingCartIcon",
  Smartphone: "DevicePhoneMobileIcon",
  Tablet: "DeviceTabletIcon",
  Ticket: "TicketIcon",
  ToggleLeft: "MinusCircleIcon",
  ToggleRight: "CheckCircleIcon",
  TrendingDown: "ArrowTrendingDownIcon",
  TrendingUp: "ArrowTrendingUpIcon",
  Umbrella: "SunIcon",
  User: "UserIcon",
  UserCheck: "UserPlusIcon",
  UserCog: "UserIcon",
  Users: "UsersIcon",
  Utensils: "FireIcon",
  UtensilsCrossed: "FireIcon",
  Wallet: "WalletIcon",
  Waves: "ArrowPathIcon",
  WifiOff: "WifiIcon",
  Wine: "BeakerIcon",
  Wrench: "WrenchIcon",
  X: "XMarkIcon",
  XCircle: "XCircleIcon",
  Zap: "BoltIcon"
};

const dir = 'C:\\Users\\User\\Music\\Yarvo-Hotel\\apps\\web\\src\\components\\landing';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find import { ... } from "lucide-react";
  const regex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
  
  let newContent = content.replace(regex, (match, importsStr) => {
    const imports = importsStr.split(',').map(i => i.trim()).filter(i => i);
    
    let heroImports = [];
    imports.forEach(imp => {
      // Handle "OldName as NewName" if it exists, though usually it's just "Name"
      let name = imp;
      if (name.includes(' as ')) {
        name = name.split(' as ')[0].trim();
      }
      
      const mapped = map[name];
      if (mapped) {
        heroImports.push(`${mapped} as ${imp}`);
      } else {
        console.warn(`WARNING: No mapping for ${name} in ${filePath}`);
      }
    });

    if (heroImports.length === 0) return '';
    return `import { ${heroImports.join(', ')} } from "@heroicons/react/24/outline";`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    processFile(path.join(dir, file));
  }
});
