import { Context } from '../context'

const resolvers = {
  Query: {
    users: (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.user.findMany()
    }
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUser: (_parent: any, args: any, context: Context) => {
      return context.prisma.user.create({
        data: {
          email: args.email
        }
      })
    }
  }
}

export default resolvers
