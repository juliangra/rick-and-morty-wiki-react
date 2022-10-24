import { loadSchema } from '@graphql-tools/load'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: await loadSchema('src/graphql/schema.graphql', {
    loaders: [new GraphQLFileLoader()]
  })
})

export default schema
