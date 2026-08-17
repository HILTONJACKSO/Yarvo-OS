const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const units = [
    { name: 'Piece', code: 'pc', unitType: 'COUNT', allowDecimals: false },
    { name: 'Kilogram', code: 'kg', unitType: 'WEIGHT', allowDecimals: true },
    { name: 'Gram', code: 'g', unitType: 'WEIGHT', allowDecimals: true },
    { name: 'Liter', code: 'L', unitType: 'VOLUME', allowDecimals: true },
    { name: 'Milliliter', code: 'mL', unitType: 'VOLUME', allowDecimals: true },
    { name: 'Bottle', code: 'btl', unitType: 'COUNT', allowDecimals: false },
    { name: 'Carton', code: 'ctn', unitType: 'COUNT', allowDecimals: false }
  ];
  for (const u of units) {
    await prisma.unitOfMeasure.create({
      data: {
        businessId: 'bus-kwalee-1',
        name: u.name,
        code: u.code,
        unitType: u.unitType,
        allowDecimals: u.allowDecimals,
        status: 'ACTIVE'
      }
    });
  }
  console.log('Units seeded');
}
main().catch(console.error).finally(() => prisma.$disconnect());
