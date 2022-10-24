import { LOCAL_GRAPHQL_ENDPOINT, REMOTE_GRAPHQL_ENDPOINT } from 'src/constants'

/**
 * Gets the GraphQL endpoint based on the current Node environment.
 * @returns the GraphQL endpoint.
 */
const getAPIEndpoint = () => {
  const dev = process.env.NODE_ENV !== 'production'
  return dev ? LOCAL_GRAPHQL_ENDPOINT : REMOTE_GRAPHQL_ENDPOINT
}

export default getAPIEndpoint
