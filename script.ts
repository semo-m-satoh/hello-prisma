import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const keyword = 'aaaabbb'
  const email = 'bob@prisma.io'
  const name = 'bob'
  
  // カテゴリ
  const category = await prisma.category.upsert({
    where: { name: keyword },
    create: { name: keyword },
    update: {}
  });

  // 会員
  const user = await prisma.user.upsert({
    where: { 
      email:email
     },
    create: { 
      name: name,
      email:email
     },
    update: {}
  });

  // 書き込み
  const post = await prisma.post.create({
    data: {
      title: 'post test title',
      content: 'post test content',
      categoryId:category.id,
      authorId:user.id
    }
  })

  // コメント
  await prisma.comment.create({
    data: {
      content: 'comment test content',
      postId: post.id,
      handleName: 'test name'
    }
  })

  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
