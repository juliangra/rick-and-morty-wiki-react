import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import useColorScheme from '../hooks/common/useColorScheme'

type StyleProviderProps = {
  children: ReactNode
}

/**
 * Provides the application with a color scheme and the Mantine UI component library.
 */
const StyleProvider: React.FC<StyleProviderProps> = ({ children }) => {
  const [colorScheme, toggleColorScheme] = useColorScheme()

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          globalStyles: () => ({
            'a:has(button)': {
              textDecoration: 'none'
            }
          })
        }}
        withGlobalStyles
        withNormalizeCSS>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default StyleProvider
