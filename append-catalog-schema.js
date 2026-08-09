const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'apps', 'api', 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

const newModels = `
// ==============================================================================
// FUNCTIONALITY 7: CATALOG, MENU, PRODUCTS & PRICING
// ==============================================================================

model CatalogCategory {
  id                String   @id @default(uuid())
  businessId        String
  parentCategoryId  String?
  name              String
  code              String
  description       String?
  imageUrl          String?
  departmentId      String?
  displayOrder      Int      @default(0)
  isCustomerVisible Boolean  @default(true)
  status            String   @default("ACTIVE")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  business       Business           @relation(fields: [businessId], references: [id], onDelete: Cascade)
  parentCategory CatalogCategory?   @relation("CategoryHierarchy", fields: [parentCategoryId], references: [id], onDelete: SetNull)
  subCategories  CatalogCategory[]  @relation("CategoryHierarchy")
  department     Department?        @relation(fields: [departmentId], references: [id], onDelete: SetNull)
  items          CatalogItem[]
  menuCategories MenuCategory[]
}

model CatalogItem {
  id                         String   @id @default(uuid())
  businessId                 String
  name                       String
  customerFacingName         String?
  code                       String
  itemType                   String // FOOD, BEVERAGE, ALCOHOLIC_BEVERAGE, SERVICE, PACKAGE, RENTAL, TICKET, FEE, ROOM_CHARGE, LAUNDRY, MINIBAR, OTHER
  categoryId                 String
  description                String?
  shortDescription           String?
  imageUrl                   String?
  basePrice                  Float
  costPrice                  Float?
  currency                   String   @default("USD")
  priceIncludesTax           Boolean  @default(false)
  taxCategoryId              String?
  serviceChargeApplies       Boolean  @default(false)
  discountAllowed            Boolean  @default(true)
  minimumSellingPrice        Float?
  priceOverrideAllowed       Boolean  @default(false)
  
  preparationRequired        Boolean  @default(false)
  preparationRoute           String? // KITCHEN, BAR, ROOM_SERVICE, SPA, LAUNDRY, FRONT_DESK, BEACH_SERVICE, POOL_SERVICE, EVENTS, NO_PREPARATION
  preparationTimeMinutes     Int?
  
  inventoryTracked           Boolean  @default(false)
  sellableWithoutStock       Boolean  @default(true)
  recipeRequired             Boolean  @default(false)
  lowStockBehavior           String? // ALLOW_SALE, WARN_STAFF, BLOCK_SALE, MARK_SOLD_OUT
  
  canChargeToRoom            Boolean  @default(true)
  requiresActiveStay         Boolean  @default(false)
  requiresGuestSignature     Boolean  @default(false)
  requiresManagementApproval Boolean  @default(false)
  maximumRoomChargeAmount    Float?
  
  isCustomerVisible          Boolean  @default(true)
  status                     String   @default("ACTIVE") // DRAFT, ACTIVE, INACTIVE, ARCHIVED
  availabilityStatus         String   @default("AVAILABLE") // AVAILABLE, SOLD_OUT, TEMPORARILY_UNAVAILABLE, SEASONAL
  
  createdAt                  DateTime @default(now())
  updatedAt                  DateTime @updatedAt

  business Business        @relation(fields: [businessId], references: [id], onDelete: Cascade)
  category CatalogCategory @relation(fields: [categoryId], references: [id], onDelete: Restrict)

  branchOverrides      CatalogItemBranch[]
  servicePointOverrides CatalogItemServicePoint[]
  variations           CatalogItemVariation[]
  modifierGroups       CatalogItemModifierGroup[]
  menuItems            MenuItem[]
  availabilitySchedules CatalogAvailabilitySchedule[]
  priceListItems       PriceListItem[]
  packageItems         PackageItem[]
  dietaryTags          CatalogItemDietaryTag[]
  allergens            CatalogItemAllergen[]

  @@unique([businessId, code])
}

model CatalogItemBranch {
  id                 String   @id @default(uuid())
  businessId         String
  branchId           String
  catalogItemId      String
  branchPrice        Float?
  isEnabled          Boolean  @default(true)
  availabilityStatus String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  business    Business    @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch      Branch      @relation(fields: [branchId], references: [id], onDelete: Cascade)
  catalogItem CatalogItem @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)

  @@unique([branchId, catalogItemId])
}

model CatalogItemServicePoint {
  id                 String   @id @default(uuid())
  businessId         String
  branchId           String
  catalogItemId      String
  servicePointId     String
  isEnabled          Boolean  @default(true)
  priceOverride      Float?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  business     Business     @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch       Branch       @relation(fields: [branchId], references: [id], onDelete: Cascade)
  catalogItem  CatalogItem  @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  servicePoint ServicePoint @relation(fields: [servicePointId], references: [id], onDelete: Cascade)

  @@unique([servicePointId, catalogItemId])
}

model CatalogItemVariation {
  id                     String   @id @default(uuid())
  businessId             String
  catalogItemId          String
  name                   String
  code                   String
  sellingPrice           Float
  costPrice              Float?
  preparationTimeMinutes Int?
  isDefault              Boolean  @default(false)
  status                 String   @default("ACTIVE")
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt

  business       Business        @relation(fields: [businessId], references: [id], onDelete: Cascade)
  catalogItem    CatalogItem     @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  priceListItems PriceListItem[]
  packageItems   PackageItem[]

  @@unique([catalogItemId, code])
}

model ModifierGroup {
  id                String   @id @default(uuid())
  businessId        String
  name              String
  code              String
  selectionType     String // SINGLE, MULTIPLE
  minimumSelections Int      @default(0)
  maximumSelections Int      @default(1)
  isRequired        Boolean  @default(false)
  status            String   @default("ACTIVE")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  business         Business                   @relation(fields: [businessId], references: [id], onDelete: Cascade)
  options          ModifierOption[]
  catalogItemLinks CatalogItemModifierGroup[]

  @@unique([businessId, code])
}

model ModifierOption {
  id              String   @id @default(uuid())
  businessId      String
  modifierGroupId String
  name            String
  code            String
  additionalPrice Float    @default(0)
  costAdjustment  Float?
  preparationNote String?
  isDefault       Boolean  @default(false)
  status          String   @default("ACTIVE")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  business      Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  modifierGroup ModifierGroup @relation(fields: [modifierGroupId], references: [id], onDelete: Cascade)

  @@unique([modifierGroupId, code])
}

model CatalogItemModifierGroup {
  id              String   @id @default(uuid())
  catalogItemId   String
  modifierGroupId String
  displayOrder    Int      @default(0)
  createdAt       DateTime @default(now())

  catalogItem   CatalogItem   @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  modifierGroup ModifierGroup @relation(fields: [modifierGroupId], references: [id], onDelete: Cascade)

  @@unique([catalogItemId, modifierGroupId])
}

model Menu {
  id              String   @id @default(uuid())
  businessId      String
  branchId        String
  departmentId    String?
  name            String
  code            String
  description     String?
  customerVisible Boolean  @default(true)
  startTime       String? // HH:mm
  endTime         String? // HH:mm
  status          String   @default("ACTIVE")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  business      Business       @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch        Branch         @relation(fields: [branchId], references: [id], onDelete: Cascade)
  department    Department?    @relation(fields: [departmentId], references: [id], onDelete: SetNull)
  servicePoints MenuServicePoint[]
  categories    MenuCategory[]
  items         MenuItem[]
  schedules     CatalogAvailabilitySchedule[]

  @@unique([branchId, code])
}

model MenuServicePoint {
  id             String   @id @default(uuid())
  menuId         String
  servicePointId String
  createdAt      DateTime @default(now())

  menu         Menu         @relation(fields: [menuId], references: [id], onDelete: Cascade)
  servicePoint ServicePoint @relation(fields: [servicePointId], references: [id], onDelete: Cascade)

  @@unique([menuId, servicePointId])
}

model MenuCategory {
  id           String   @id @default(uuid())
  menuId       String
  categoryId   String
  displayOrder Int      @default(0)
  isVisible    Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  menu     Menu            @relation(fields: [menuId], references: [id], onDelete: Cascade)
  category CatalogCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([menuId, categoryId])
}

model MenuItem {
  id                         String   @id @default(uuid())
  menuId                     String
  catalogItemId              String
  displayOrder               Int      @default(0)
  isVisible                  Boolean  @default(true)
  isFeatured                 Boolean  @default(false)
  customerFacingNameOverride String?
  priceOverride              Float?
  badge                      String? // Popular, New, Chef’s Choice, Spicy, Vegetarian, Limited, VIP, Special Offer
  createdAt                  DateTime @default(now())
  updatedAt                  DateTime @updatedAt

  menu        Menu        @relation(fields: [menuId], references: [id], onDelete: Cascade)
  catalogItem CatalogItem @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)

  @@unique([menuId, catalogItemId])
}

model CatalogAvailabilitySchedule {
  id             String   @id @default(uuid())
  businessId     String
  branchId       String
  catalogItemId  String?
  menuId         String?
  servicePointId String?
  dayOfWeek      String // MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
  startTime      String // HH:mm
  endTime        String // HH:mm
  validFrom      DateTime?
  validUntil     DateTime?
  isAvailable    Boolean  @default(true)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  business     Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch       Branch        @relation(fields: [branchId], references: [id], onDelete: Cascade)
  catalogItem  CatalogItem?  @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  menu         Menu?         @relation(fields: [menuId], references: [id], onDelete: Cascade)
  servicePoint ServicePoint? @relation(fields: [servicePointId], references: [id], onDelete: Cascade)
}

model PriceList {
  id         String   @id @default(uuid())
  businessId String
  branchId   String
  name       String
  code       String
  currency   String   @default("USD")
  validFrom  DateTime?
  validUntil DateTime?
  priority   Int      @default(0)
  status     String   @default("ACTIVE")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  business Business        @relation(fields: [businessId], references: [id], onDelete: Cascade)
  branch   Branch          @relation(fields: [branchId], references: [id], onDelete: Cascade)
  items    PriceListItem[]

  @@unique([branchId, code])
}

model PriceListItem {
  id              String   @id @default(uuid())
  priceListId     String
  catalogItemId   String
  variationId     String?
  sellingPrice    Float
  minimumPrice    Float?
  discountAllowed Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  priceList   PriceList             @relation(fields: [priceListId], references: [id], onDelete: Cascade)
  catalogItem CatalogItem           @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  variation   CatalogItemVariation? @relation(fields: [variationId], references: [id], onDelete: Cascade)

  @@unique([priceListId, catalogItemId, variationId])
}

model Package {
  id           String   @id @default(uuid())
  businessId   String
  name         String
  code         String
  description  String?
  packageType  String // COMBO, EVENT_PACKAGE, ROOM_PACKAGE, BEACH_PACKAGE, POOL_PACKAGE, CORPORATE_PACKAGE, OTHER
  packagePrice Float
  costEstimate Float?
  currency     String   @default("USD")
  maximumUsers Int?
  validFrom    DateTime?
  validUntil   DateTime?
  status       String   @default("ACTIVE")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  business Business      @relation(fields: [businessId], references: [id], onDelete: Cascade)
  items    PackageItem[]

  @@unique([businessId, code])
}

model PackageItem {
  id            String   @id @default(uuid())
  packageId     String
  catalogItemId String
  variationId   String?
  quantity      Int      @default(1)
  isOptional    Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  package     Package               @relation(fields: [packageId], references: [id], onDelete: Cascade)
  catalogItem CatalogItem           @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  variation   CatalogItemVariation? @relation(fields: [variationId], references: [id], onDelete: Cascade)

  @@unique([packageId, catalogItemId, variationId])
}

model CatalogDietaryTag {
  id         String   @id @default(uuid())
  businessId String
  name       String
  code       String
  status     String   @default("ACTIVE")
  createdAt  DateTime @default(now())

  business Business                @relation(fields: [businessId], references: [id], onDelete: Cascade)
  items    CatalogItemDietaryTag[]

  @@unique([businessId, code])
}

model CatalogItemDietaryTag {
  id            String   @id @default(uuid())
  catalogItemId String
  dietaryTagId  String
  createdAt     DateTime @default(now())

  catalogItem CatalogItem       @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  dietaryTag  CatalogDietaryTag @relation(fields: [dietaryTagId], references: [id], onDelete: Cascade)

  @@unique([catalogItemId, dietaryTagId])
}

model CatalogAllergen {
  id         String   @id @default(uuid())
  businessId String
  name       String
  code       String
  status     String   @default("ACTIVE")
  createdAt  DateTime @default(now())

  business Business              @relation(fields: [businessId], references: [id], onDelete: Cascade)
  items    CatalogItemAllergen[]

  @@unique([businessId, code])
}

model CatalogItemAllergen {
  id            String   @id @default(uuid())
  catalogItemId String
  allergenId    String
  createdAt     DateTime @default(now())

  catalogItem CatalogItem     @relation(fields: [catalogItemId], references: [id], onDelete: Cascade)
  allergen    CatalogAllergen @relation(fields: [allergenId], references: [id], onDelete: Cascade)

  @@unique([catalogItemId, allergenId])
}
`;

if (!schema.includes('model CatalogItem')) {
  // We need to add the relations to the Business model.
  // I will just append the models, the Business/Branch/Department models already exist but I won't explicitly inject back-references inside them unless strictly necessary (Prisma usually infers the other side if the relation name is simple, but we should make sure).
  
  fs.appendFileSync(schemaPath, '\\n' + newModels);
  console.log('Appended catalog models to schema.prisma');
} else {
  console.log('Catalog models already exist.');
}
