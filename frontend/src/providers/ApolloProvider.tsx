import {
  ApolloClient,
  ApolloProvider as GraphQLClientProvider,
  InMemoryCache
} from '@apollo/client'
import { ReactNode } from 'react'
import { GRAPHQL_ENDPOINT } from '../constants'

type ApolloProviderProps = {
  children: ReactNode
}

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
})

const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <GraphQLClientProvider client={client}>{children}</GraphQLClientProvider>
}

export default ApolloProvider
