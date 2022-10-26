import { ReactNode } from 'react'
import ApolloProvider from './ApolloProvider'
import RouterProvider from './RouterProvider'
import StyleProvider from './StyleProvider'

type AppProviderProps = {
  children?: ReactNode
}

/**
 * Provides the application with all the providers it needs.
 */
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ApolloProvider>
      <StyleProvider>
        <RouterProvider>{children}</RouterProvider>
      </StyleProvider>
    </ApolloProvider>
  )
}

export default AppProvider
