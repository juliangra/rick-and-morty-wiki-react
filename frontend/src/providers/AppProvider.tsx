import { ReactNode } from 'react'
import ApolloProvider from './ApolloProvider'
import RouterProvider from './RouterProvider'
import StyleProvider from './StyleProvider'

type AppProviderProps = {
  children?: ReactNode
}

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
