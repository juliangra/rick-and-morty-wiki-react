import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import useColorScheme from '../hooks/useTheme'

type StyleProviderProps = {
  children: ReactNode
}

const StyleProvider: React.FC<StyleProviderProps> = ({ children }) => {
  const [colorScheme, toggleColorScheme] = useColorScheme()

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default StyleProvider
