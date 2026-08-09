const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add occupancyStatus to Room
schema = schema.replace(
  '  operationalStatus String   @default("AVAILABLE") // AVAILABLE, OUT_OF_SERVICE, UNDER_MAINTENANCE, INACTIVE',
  '  operationalStatus String   @default("AVAILABLE") // AVAILABLE, OUT_OF_SERVICE, UNDER_MAINTENANCE, INACTIVE\n  occupancyStatus   String   @default("VACANT") // VACANT, OCCUPIED, RESERVED, CHECKOUT_PENDING'
);

// Add StayRoomAssignments and GuestRequests to Room
schema = schema.replace(
  '  reservationRooms ReservationRoom[]\n  roomBlocks       RoomBlock[]',
  '  reservationRooms ReservationRoom[]\n  roomBlocks       RoomBlock[]\n  stayRoomAssignments StayRoomAssignment[]\n  guestRequests    GuestRequest[]'
);

// 2. Add Stays to User
schema = schema.replace(
  '  createdWaitlists      ReservationWaitlist[] @relation("WaitlistCreatedBy")',
  `  createdWaitlists      ReservationWaitlist[] @relation("WaitlistCreatedBy")
  
  // Stays & Folios
  checkedInStays         Stay[]               @relation("StayCheckedInBy")
  checkoutPreparedStays  Stay[]               @relation("StayCheckoutPreparedBy")
  stayRoomAssignments    StayRoomAssignment[] @relation("StayRoomAssignedBy")
  postedFolioEntries     FolioEntry[]         @relation("FolioEntryPostedBy")
  voidedFolioEntries     FolioEntry[]         @relation("FolioEntryVoidedBy")
  createdGuestRequests   GuestRequest[]       @relation("GuestRequestCreatedBy")
  stayHistories          StayHistory[]        @relation("StayHistoryChangedBy")`
);

// 3. Add Stays to Business
schema = schema.replace(
  '  onlineBookingRequests OnlineBookingRequest[]',
  `  onlineBookingRequests OnlineBookingRequest[]
  
  // Stays & Folios
  stays                  Stay[]
  stayRoomAssignments    StayRoomAssignment[]
  stayOccupants          StayOccupant[]
  guestFolios            GuestFolio[]
  folioEntries           FolioEntry[]
  guestRequests          GuestRequest[]
  stayHistories          StayHistory[]`
);

// 4. Add Stays to Branch
schema = schema.replace(
  '  onlineBookingRequests OnlineBookingRequest[]\n}',
  `  onlineBookingRequests OnlineBookingRequest[]
  
  // Stays & Folios
  stays                  Stay[]
  stayRoomAssignments    StayRoomAssignment[]
  guestFolios            GuestFolio[]
  folioEntries           FolioEntry[]
  guestRequests          GuestRequest[]
  stayHistories          StayHistory[]
}`
);

// 5. Add Stays to Customer
schema = schema.replace(
  '  onlineBookingRequests OnlineBookingRequest[]\n\n  @@unique([businessId, customerNumber])',
  `  onlineBookingRequests OnlineBookingRequest[]
  
  // Stays & Folios
  stays                  Stay[]               @relation("CustomerStays")
  stayOccupants          StayOccupant[]       @relation("CustomerStayOccupants")
  guestFolios            GuestFolio[]         @relation("CustomerGuestFolios")

  @@unique([businessId, customerNumber])`
);

// 6. Add Stays to CorporateAccount
schema = schema.replace(
  '  reservations Reservation[]\n\n  @@unique([businessId, corporateNumber])',
  `  reservations Reservation[]
  
  // Stays
  stays                  Stay[]               @relation("CorporateStays")
  guestFolios            GuestFolio[]         @relation("CorporateGuestFolios")

  @@unique([businessId, corporateNumber])`
);

// 7. Add Stays to CustomerGroup
schema = schema.replace(
  '  reservations Reservation[]\n\n  @@unique([businessId, groupNumber])',
  `  reservations Reservation[]
  
  // Stays
  stays                  Stay[]               @relation("GroupStays")

  @@unique([businessId, groupNumber])`
);

// 8. Add Stay relation to Reservation
schema = schema.replace(
  '  history          ReservationHistory[]\n\n  @@unique([businessId, reservationNumber])',
  `  history          ReservationHistory[]
  stay             Stay?

  @@unique([businessId, reservationNumber])`
);

// 9. Add New Models
const newModels = `

model Stay {
  id                        String    @id @default(uuid())
  businessId                String
  branchId                  String
  stayNumber                String
  reservationId             String    @unique
  primaryCustomerId         String?
  corporateAccountId        String?
  customerGroupId           String?
  status                    String
  arrivalDateTime           DateTime
  expectedDepartureDateTime DateTime
  actualDepartureDateTime   DateTime?
  adultCount                Int
  childCount                Int       @default(0)
  infantCount               Int       @default(0)
  currency                  String
  creditLimit               Float?
  paymentArrangement        String?
  specialRequests           String?
  internalNotes             String?
  checkedInByUserId         String?
  checkedInAt               DateTime?
  checkoutPreparedByUserId  String?
  checkoutPreparedAt        DateTime?
  createdAt                 DateTime  @default(now())
  updatedAt                 DateTime  @updatedAt

  business         Business          @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch           Branch            @relation(fields: [branchId], references: [id], onDelete: Cascade)
  reservation      Reservation       @relation(fields: [reservationId], references: [id], onDelete: Restrict)
  primaryCustomer  Customer?         @relation("CustomerStays", fields: [primaryCustomerId], references: [id], onDelete: SetNull)
  corporateAccount CorporateAccount? @relation("CorporateStays", fields: [corporateAccountId], references: [id], onDelete: SetNull)
  customerGroup    CustomerGroup?    @relation("GroupStays", fields: [customerGroupId], references: [id], onDelete: SetNull)
  checkedInByUser  User?             @relation("StayCheckedInBy", fields: [checkedInByUserId], references: [id], onDelete: SetNull)
  checkoutPreparedByUser User?       @relation("StayCheckoutPreparedBy", fields: [checkoutPreparedByUserId], references: [id], onDelete: SetNull)

  roomAssignments StayRoomAssignment[]
  occupants       StayOccupant[]
  folios          GuestFolio[]
  guestRequests   GuestRequest[]
  history         StayHistory[]

  @@unique([businessId, stayNumber])
}

model StayRoomAssignment {
  id              String    @id @default(uuid())
  businessId      String
  branchId        String
  stayId          String
  roomId          String
  roomTypeId      String
  assignedAt      DateTime  @default(now())
  releasedAt      DateTime?
  nightlyRate     Float
  assignmentReason String?
  isCurrent       Boolean   @default(true)
  createdByUserId String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  business Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch   Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  stay     Stay     @relation(fields: [stayId], references: [id], onDelete: Cascade)
  room     Room     @relation(fields: [roomId], references: [id], onDelete: Restrict)
  createdByUser User? @relation("StayRoomAssignedBy", fields: [createdByUserId], references: [id], onDelete: SetNull)
}

model StayOccupant {
  id                         String   @id @default(uuid())
  businessId                 String
  stayId                     String
  customerId                 String?
  fullName                   String
  phone                      String?
  email                      String?
  adultOrChild               String
  relationshipToPrimaryGuest String?
  isPrimaryGuest             Boolean  @default(false)
  status                     String   @default("ACTIVE")
  createdAt                  DateTime @default(now())
  updatedAt                  DateTime @updatedAt

  business Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)
  stay     Stay      @relation(fields: [stayId], references: [id], onDelete: Cascade)
  customer Customer? @relation("CustomerStayOccupants", fields: [customerId], references: [id], onDelete: SetNull)
}

model GuestFolio {
  id                 String    @id @default(uuid())
  businessId         String
  branchId           String
  stayId             String
  folioNumber        String
  primaryCustomerId  String?
  corporateAccountId String?
  currency           String
  status             String
  creditLimit        Float?
  totalCharges       Float     @default(0)
  totalPayments      Float     @default(0)
  totalDiscounts     Float     @default(0)
  totalAdjustments   Float     @default(0)
  estimatedTaxes     Float     @default(0)
  currentBalance     Float     @default(0)
  openedAt           DateTime  @default(now())
  closedAt           DateTime?
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  business         Business          @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch           Branch            @relation(fields: [branchId], references: [id], onDelete: Cascade)
  stay             Stay              @relation(fields: [stayId], references: [id], onDelete: Cascade)
  primaryCustomer  Customer?         @relation("CustomerGuestFolios", fields: [primaryCustomerId], references: [id], onDelete: SetNull)
  corporateAccount CorporateAccount? @relation("CorporateGuestFolios", fields: [corporateAccountId], references: [id], onDelete: SetNull)

  entries FolioEntry[]

  @@unique([businessId, folioNumber])
}

model FolioEntry {
  id               String    @id @default(uuid())
  businessId       String
  branchId         String
  folioId          String
  entryNumber      String
  entryType        String
  department       String
  referenceType    String?
  referenceId      String?
  description      String
  quantity         Int       @default(1)
  unitAmount       Float
  grossAmount      Float
  discountAmount   Float     @default(0)
  taxAmount        Float     @default(0)
  netAmount        Float
  paymentMethod    String?
  paymentReference String?
  serviceDate      DateTime
  status           String
  postedByUserId   String?
  postedAt         DateTime  @default(now())
  voidedByUserId   String?
  voidedAt         DateTime?
  voidReason       String?
  notes            String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  business Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch   Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  folio    GuestFolio @relation(fields: [folioId], references: [id], onDelete: Cascade)
  postedByUser User?  @relation("FolioEntryPostedBy", fields: [postedByUserId], references: [id], onDelete: SetNull)
  voidedByUser User?  @relation("FolioEntryVoidedBy", fields: [voidedByUserId], references: [id], onDelete: SetNull)

  @@unique([businessId, entryNumber])
}

model GuestRequest {
  id                   String    @id @default(uuid())
  businessId           String
  branchId             String
  stayId               String
  roomId               String?
  category             String
  description          String
  priority             String
  assignedDepartmentId String?
  assignedEmployeeId   String?
  status               String
  dueAt                DateTime?
  completedAt          DateTime?
  createdByUserId      String?
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  business Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch   Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  stay     Stay     @relation(fields: [stayId], references: [id], onDelete: Cascade)
  room     Room?    @relation(fields: [roomId], references: [id], onDelete: SetNull)
  createdByUser User? @relation("GuestRequestCreatedBy", fields: [createdByUserId], references: [id], onDelete: SetNull)
}

model StayHistory {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  stayId          String
  changedByUserId String?
  action          String
  previousValues  String?  // JSON
  newValues       String?  // JSON
  description     String
  createdAt       DateTime @default(now())

  business      Business @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch        Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  stay          Stay     @relation(fields: [stayId], references: [id], onDelete: Cascade)
  changedByUser User?    @relation("StayHistoryChangedBy", fields: [changedByUserId], references: [id], onDelete: SetNull)
}
`;

schema += newModels;

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Schema updated successfully!');
