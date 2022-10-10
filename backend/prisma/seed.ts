import { context } from '../src/context'

const main = async () => {
  const firstId = 1

  await context.prisma.user.upsert({
    where: {
      id: firstId
    },
    create: {
      id: firstId,
      email: 'john.doe@example.com'
    },
    update: {
      id: firstId,
      email: 'john.doe@example.com'
    }
  })
}

main()
  .catch((error) => {
    console.error(`❌ An error occurred: ${error.message}`)
    process.exit(1)
  })
  .finally(async () => {
    await context.prisma.$disconnect()
  })
