const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'apps', 'api', 'prisma', 'schema.prisma');

const financeModels = `
// ==========================================
// FUNCTIONALITY 14: FINANCE & ACCOUNTING
// ==========================================

model Account {
  id             String   @id @default(uuid())
  businessId     String
  branchId       String?
  accountCode    String
  name           String
  type           String   // ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE
  subType        String?  // CASH, BANK, RECEIVABLE, INVENTORY, PAYABLE, TAX, etc.
  currency       String   @default("USD")
  balance        Float    @default(0)
  isSystem       Boolean  @default(false)
  status         String   @default("ACTIVE")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model JournalEntry {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  entryNumber     String
  referenceType   String?  // END_OF_DAY_SUMMARY, INVOICE, PAYMENT, DEPRECIATION, MANUAL
  referenceId     String?
  entryDate       DateTime
  description     String
  totalDebit      Float
  totalCredit     Float
  status          String   @default("POSTED") // POSTED, DRAFT, REVERSED
  createdByUserId String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model JournalLine {
  id              String   @id @default(uuid())
  journalEntryId  String
  accountId       String
  description     String?
  debitAmount     Float    @default(0)
  creditAmount    Float    @default(0)
}

model BankAccount {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  accountId       String   // Linked to Chart of Accounts
  accountName     String
  accountNumber   String?
  bankName        String?
  accountType     String   // BANK, CASH, MOBILE_MONEY
  currency        String   @default("USD")
  balance         Float    @default(0)
  status          String   @default("ACTIVE")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model BankTransaction {
  id              String   @id @default(uuid())
  bankAccountId   String
  journalEntryId  String?
  transactionDate DateTime
  type            String   // DEPOSIT, WITHDRAWAL, TRANSFER
  amount          Float
  reference       String?
  description     String?
  status          String   @default("CLEARED") // CLEARED, PENDING, RECONCILED
  createdAt       DateTime @default(now())
}

model Invoice {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  invoiceNumber   String
  type            String   // RECEIVABLE (Customer), PAYABLE (Supplier)
  partyId         String   // CustomerId or SupplierId
  invoiceDate     DateTime
  dueDate         DateTime
  subtotal        Float
  taxAmount       Float    @default(0)
  totalAmount     Float
  amountPaid      Float    @default(0)
  balanceDue      Float
  status          String   // DRAFT, UNPAID, PARTIAL, PAID, VOID
  journalEntryId  String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model InvoiceLine {
  id              String   @id @default(uuid())
  invoiceId       String
  accountId       String?  // Revenue or Expense account
  description     String
  quantity        Float    @default(1)
  unitPrice       Float
  taxAmount       Float    @default(0)
  lineTotal       Float
}

model Payment {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  paymentNumber   String
  type            String   // RECEIVABLE, PAYABLE
  partyId         String
  invoiceId       String?
  bankAccountId   String
  paymentDate     DateTime
  amount          Float
  paymentMethod   String   // CASH, TRANSFER, CARD, MOBILE_MONEY
  reference       String?
  journalEntryId  String?
  createdAt       DateTime @default(now())
}

model Budget {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  departmentId    String?
  name            String
  fiscalYear      Int
  period          String   // ANNUAL, MONTHLY
  totalAmount     Float
  status          String   @default("ACTIVE") // DRAFT, ACTIVE, CLOSED
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model BudgetLine {
  id              String   @id @default(uuid())
  budgetId        String
  accountId       String
  amount          Float
  spentAmount     Float    @default(0)
  periodMonth     Int?
}

model FixedAsset {
  id               String   @id @default(uuid())
  businessId       String
  branchId         String
  departmentId     String?
  assetCode        String   @unique
  name             String
  category         String   // VEHICLE, EQUIPMENT, FURNITURE, IT, BUILDING
  purchaseDate     DateTime
  purchasePrice    Float
  salvageValue     Float    @default(0)
  usefulLifeMonths Int
  depreciationMethod String @default("STRAIGHT_LINE")
  currentValue     Float
  accumulatedDepr  Float    @default(0)
  status           String   @default("ACTIVE") // ACTIVE, DISPOSED, MAINTENANCE
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model DepreciationLog {
  id              String   @id @default(uuid())
  fixedAssetId    String
  journalEntryId  String?
  runDate         DateTime
  depreciationAmount Float
  createdAt       DateTime @default(now())
}
`;

fs.appendFileSync(schemaPath, financeModels);
console.log('Finance models appended successfully.');
