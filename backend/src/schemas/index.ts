import { loadSchema } from '@graphql-tools/load'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import { UrlLoader } from '@graphql-tools/url-loader'
import { GRAPHQL_ENDPOINT } from '../constants'
import resolvers from '../resolvers'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const localSchema = makeExecutableSchema({
  resolvers,
  typeDefs: await loadSchema('src/graphql/schema.graphql', {
    loaders: [new GraphQLFileLoader()]
  })
})

const remoteSchema = await loadSchema(GRAPHQL_ENDPOINT, {
  loaders: [new UrlLoader()]
})

const schema = stitchSchemas({
  subschemas: [localSchema, remoteSchema]
})

export default schema
