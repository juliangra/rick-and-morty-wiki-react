import { ApolloProvider } from '@apollo/client'
import { ColorSchemeProvider } from '@mantine/core'
import { render, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import { client } from 'src/providers/ApolloProvider'

/**
 * Wrapper around the necessary providers used in the app.
 * @param ui is the component to render.
 *
 * @returns the rendered component, wrapped in the providers.
 */
export const renderWithProviders = async (ui: ReactNode) =>
  await waitFor(() => {
    render(
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={() => {}}>
            {ui}
          </ColorSchemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    )
  })

/**
 * Wrapper around react-test-renderer for creating components with the necessary providers used in the app.
 * @param ui is the component to render.
 *
 * @returns the rendered component, wrapped in the providers.
 */
export const createWithProviders = (ui: ReactNode) =>
  renderer.create(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={() => {}}>
          {ui}
        </ColorSchemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
