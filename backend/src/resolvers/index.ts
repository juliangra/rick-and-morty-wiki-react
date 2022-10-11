import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    users: (_root, _args, context) => {
      return context.prisma.user.findMany()
    }
  },
  Mutation: {
    createUser: (_root, args, context) => {
      return context.prisma.user.create({
        data: {
          email: args.email
        }
      })
    }
  }
}

export default resolvers
