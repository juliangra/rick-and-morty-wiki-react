import { ReactNode } from 'react'
import Layout from '../components/common/Layout'
import ApolloProvider from './ApolloProvider'
import RouterProvider from './RouterProvider'
import StyleProvider from './StyleProvider'

type AppProviderProps = {
  children?: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <RouterProvider>
      <ApolloProvider>
        <StyleProvider>
          <Layout>{children}</Layout>
        </StyleProvider>
      </ApolloProvider>
    </RouterProvider>
  )
}

export default AppProvider
