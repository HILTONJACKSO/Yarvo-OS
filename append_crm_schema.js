const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'apps', 'api', 'prisma', 'schema.prisma');
const schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `

model CustomerTag {
  id              String   @id @default(uuid())
  customerId      String
  tag             String
  createdAt       DateTime @default(now())

  customer        Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  @@unique([customerId, tag])
}

model CustomerTimeline {
  id              String   @id @default(uuid())
  customerId      String
  referenceType   String   // Reservation, Check-in, Restaurant Order, Beach Ticket, Payment, Complaint, Feedback, Checkout, Event
  referenceId     String?
  title           String
  description     String?
  department      String?
  createdByUserId String?
  createdAt       DateTime @default(now())

  customer        Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  createdByUser   User?    @relation("TimelineCreatedBy", fields: [createdByUserId], references: [id], onDelete: SetNull)
}

model CustomerDocument {
  id               String   @id @default(uuid())
  customerId       String
  documentType     String   // Passport, National ID, Visa, Driver License, Business Registration
  filePath         String
  expiryDate       DateTime?
  verifiedByUserId String?
  createdAt        DateTime @default(now())

  customer         Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  verifiedByUser   User?    @relation("DocumentVerifiedBy", fields: [verifiedByUserId], references: [id], onDelete: SetNull)
}

model CustomerComplaint {
  id               String   @id @default(uuid())
  customerId       String
  departmentId     String?
  title            String
  description      String
  priority         String   // LOW, MEDIUM, HIGH, URGENT
  status           String   @default("OPEN") // OPEN, IN_PROGRESS, WAITING_CUSTOMER, RESOLVED, CLOSED
  assignedToUserId String?
  resolvedAt       DateTime?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  customer         Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  assignedToUser   User?    @relation("ComplaintAssignedTo", fields: [assignedToUserId], references: [id], onDelete: SetNull)
}

model CustomerCommunication {
  id               String   @id @default(uuid())
  customerId       String
  channel          String   // Email, SMS, WhatsApp, Phone, In Person
  direction        String   // INBOUND, OUTBOUND
  subject          String?
  message          String
  status           String   @default("SENT") // PENDING, SENT, DELIVERED, FAILED, RECEIVED
  sentByUserId     String?
  createdAt        DateTime @default(now())

  customer         Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  sentByUser       User?    @relation("CommunicationSentBy", fields: [sentByUserId], references: [id], onDelete: SetNull)
}
`;

fs.appendFileSync(schemaPath, newModels);
console.log('CRM models appended successfully.');
