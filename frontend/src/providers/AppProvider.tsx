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
    <ApolloProvider>
      <StyleProvider>
        <Layout>
          <RouterProvider>{children}</RouterProvider>
        </Layout>
      </StyleProvider>
    </ApolloProvider>
  )
}

export default AppProvider
