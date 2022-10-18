import { JWT_SECRET } from '../constants'
import { isValidEmail } from '../auth/isValidEmail'
import { isValidUsername } from '../auth/isValidUsername'
import { Resolvers } from '../generated/graphql'
import { ratingToNumber } from '../utils/rating'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const resolvers: Resolvers = {
  Query: {
    users: (_root, _args, context) => {
      // Ensure that the users have connected ratings
      return context.prisma.user.findMany({
        select: {
          email: true,
          username: true,
          password: true,
          createdAt: true,
          id: true,
          ratings: {
            select: {
              userId: true,
              characterId: true,
              value: true
            }
          }
        }
      })
    },

    user: (_root, args, context) => {
      return context.prisma.user.findFirst({
        where: {
          username: {
            equals: args.username
          }
        }
      })
    },

    ratings: (_root, args, context) => {
      return context.prisma.rating.findMany({
        orderBy: {
          value: args.order
        }
      })
    },

    rating: async (_root, args, context) => {
      const characterId = parseInt(args.characterId)
      const userId = args.userId

      return context.prisma.rating.findUnique({
        where: {
          userId_characterId: {
            characterId,
            userId
          }
        }
      })
    },

    ratingStatsByCharacterId: async (_root, args, context) => {
      const characterId = parseInt(args.characterId)
      const order = args.order

      const average = await context.prisma.rating
        .aggregate({
          where: {
            characterId
          },
          _avg: {
            value: true
          },
          orderBy: {
            value: order
          }
        })
        .then((res) => res._avg?.value)

      const count = await context.prisma.rating.count({
        where: {
          characterId
        }
      })

      return {
        average: average ?? 0,
        count
      }
    },

    hasRatedCharacter: async (_root, args, context) => {
      const characterId = parseInt(args.characterId)
      const userId = args.userId

      const rating = await context.prisma.rating.findUnique({
        where: {
          userId_characterId: {
            characterId,
            userId
          }
        }
      })

      return rating !== null
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
      return {
        token
      }
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

      const { password: dbPassword, id, username } = user

      const validPassword = await bcrypt.compare(password, dbPassword)

      if (!validPassword) return { error: 'No user found with given credentials!' }

      const token = jwt.sign({ id, username }, JWT_SECRET)
      return { token }
    },

    rateCharacter: async (_root, args, context) => {
      const characterId = parseInt(args.characterId)
      const userId = args.userId
      const value = ratingToNumber(args.value)

      // Ensure that character exists in database
      await context.prisma.character.upsert({
        where: {
          id: characterId
        },
        create: {
          id: characterId
        },
        update: {
          id: characterId
        }
      })

      // Create or update ratings connected to user in database
      await context.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ratings: {
            connectOrCreate: {
              create: {
                value,
                characterId
              },
              where: {
                userId_characterId: {
                  userId,
                  characterId
                }
              }
            }
          }
        }
      })

      // Create or update entry in link table of ratings
      return context.prisma.rating.upsert({
        where: {
          userId_characterId: {
            characterId,
            userId
          }
        },
        create: {
          value,
          characterId,
          userId
        },
        update: {
          value,
          characterId,
          userId
        }
      })
    },

    deleteRating: async (_root, args, context) => {
      const characterId = parseInt(args.characterId)
      const userId = args.userId

      return context.prisma.rating.delete({
        where: {
          userId_characterId: {
            characterId,
            userId
          }
        }
      })
    }
  }
}

export default resolvers
