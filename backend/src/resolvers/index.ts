import { Resolvers } from '../generated/graphql'
import { JWT_SECRET } from '../../constants'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { isValidEmail } from '../auth/isValidEmail'
import { isValidUsername } from '../auth/isValidUsername'

const resolvers: Resolvers = {
  Query: {
    users: (_root, _args, context) => {
      return context.prisma.user.findMany()
    },
    user: (_root, args, context) => {
      return context.prisma.user.findFirst({
        where: {
          username: {
            equals: args.username
          }
        }
      })
    }
  },
  Mutation: {
    createUser: async (_root, args, context) => {
      const { email, username, password } = args

      const validEmail = await isValidEmail(email)
      if (!validEmail.ok) return { error: validEmail.error }

      const validUsername = await isValidUsername(username)
      if (!validUsername.ok) return { error: validUsername.error }

      if (password.length < 6) return { error: 'Password must be at least 6 characters long' }

      const encryptedPassword = await bcrypt.hash(password, 10)

      const user = await context.prisma.user.create({
        data: {
          email: email,
          username: username,
          password: encryptedPassword
        }
      })

      if (!user.id) return { error: 'User could not be created. Please try again' }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET)
      return { token }
    },
    authenticateUser: async (_root, args, context) => {
      const { identifier, password } = args

      if (!identifier) return { error: 'Please provide either a username or an email address!' }

      const user = await context.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: {
                equals: identifier
              }
            },
            {
              username: {
                equals: identifier
              }
            }
          ]
        }
      })

      if (!user?.id) return { error: 'No user found with given credentials!' }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) return { error: 'No user found with given credentials!' }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET)
      return { token }
    }
  }
}

export default resolvers
