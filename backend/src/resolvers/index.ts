import { Context } from '../context'

const resolvers = {
  Query: {
    health: () => "I'm alive!",
    users: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany()
    }
  },
  Mutation: {
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
