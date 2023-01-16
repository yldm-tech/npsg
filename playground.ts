import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

async function main() {
  // 增加
  // const result = await prisma.post.create({
  //   data: { title: '2', body: 'test2', description: 'prisma2' },
  // });

  // 查
  // const result = await prisma.post.findMany();

  // 修改
  // const result = await prisma.post.update({
  //   where: { id: 1 },
  //   data: {
  //     description: 'prisma1',
  //   },
  // });

  const result = await prisma.post.findFirst();

  console.log(result);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
