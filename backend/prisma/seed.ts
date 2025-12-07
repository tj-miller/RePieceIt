import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main(): Promise<void> {
  await prisma.user.create({
    data: {
      email: 'demo@repieceit.app',
      name: 'Demo User',
    },
  });

  console.log('Seed data inserted!');
}

main()
  .catch((e: unknown) => {
    console.error('Error seeding DB', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
