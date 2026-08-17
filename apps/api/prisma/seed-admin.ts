import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting password for admin user...');
  const passwordHash = await argon2.hash('password123');
  
  await prisma.user.update({
    where: { email: 'joe@gmail.com' },
    data: { passwordHash, status: 'ACTIVE' }
  });

  console.log('Password reset to: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
