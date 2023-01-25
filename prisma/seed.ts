import { PrismaClient } from '@prisma/client';
import { Role } from 'src/user/user';

const prisma = new PrismaClient();

async function main() {
  // create two dummy posts
  const xiaomo = {
    name: 'xiaomo',
    email: 'xiaomo@xiaomo.info',
    password: '$2b$10$jAA0vBjSZUautzMdb/LB7OBE5I1dtRcsGwz5z9qX90MNBWlJGAeo', // xiaomo123
    roles: [Role.Admin, Role.User],
  };

  const post1 = await prisma.post.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      User: {
        connectOrCreate: {
          where: {
            email: xiaomo.email,
          },
          create: xiaomo,
        },
      },
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description: `We are excited to share that today\'s Prisma ORM release adds stable support for MongoDB!`,
      published: false,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { title: 'What is new in Prisma? (Q1/22)' },
    update: {},
    create: {
      User: {
        connectOrCreate: {
          where: {
            email: xiaomo.email,
          },
          create: xiaomo,
        },
      },
      title: 'What is new in Prisma? (Q1/22)',
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
