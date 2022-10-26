import {
  ApolloClient,
  ApolloProvider as GraphQLClientProvider,
  InMemoryCache
} from '@apollo/client'
import { ReactNode } from 'react'
import getAPIEndpoint from 'src/utils/api'

type ApolloProviderProps = {
  children: ReactNode
}

export const client = new ApolloClient({
  uri: getAPIEndpoint(),
  cache: new InMemoryCache()
})

/**
 * Provides the GraphQL client to the application.
 */
const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <GraphQLClientProvider client={client}>{children}</GraphQLClientProvider>
}

export default ApolloProvider
