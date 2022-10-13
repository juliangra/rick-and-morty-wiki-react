import { context } from '../src/context'
import bcrypt from 'bcrypt'

const main = async () => {
  const firstId = 'c01234db-a6a1-49de-98d7-3419dfe6200b'
  const password = 'testPassword'

  const encryptedPassword = await bcrypt.hash(password, 10)

  await context.prisma.user.upsert({
    where: {
      id: firstId
    },
    create: {
      id: firstId,
      email: 'john.doe@example.com',
      username: 'john',
      password: encryptedPassword
    },
    update: {
      id: firstId,
      email: 'john.doe@example.com',
      username: 'john'
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
