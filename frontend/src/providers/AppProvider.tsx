import { MantineProvider, Text } from "@mantine/core"
import { ReactNode } from "react"
import ApolloProvider from "./ApolloProvider"

type AppProviderProps = {
  children?: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ApolloProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Text>Welcome to Mantine!</Text>
        {children}
      </MantineProvider>
    </ApolloProvider>
  )
}

export default AppProvider
