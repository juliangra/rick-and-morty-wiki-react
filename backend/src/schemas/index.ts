import { loadSchema } from '@graphql-tools/load'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import { UrlLoader } from '@graphql-tools/url-loader'
import { GRAPHQL_ENDPOINT } from '../../constants'
import resolvers from '../resolvers'
import typeDefs from '../types'

const localSchema = makeExecutableSchema({
  resolvers,
  typeDefs
})

const remoteSchema = await loadSchema(GRAPHQL_ENDPOINT, {
  loaders: [new UrlLoader()]
})

const schema = stitchSchemas({
  subschemas: [localSchema, remoteSchema]
})

export default schema
