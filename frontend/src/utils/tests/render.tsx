import { ApolloProvider } from '@apollo/client'
import { client } from 'src/providers/ApolloProvider'
import { ReactNode } from 'react'
import renderer from 'react-test-renderer'
import { render, waitFor } from '@testing-library/react'

/**
 * Wrapper around @testing-library/react for rendering components with ApolloProvider.
 * @param ui is the component to render.
 * @returns the rendered component, wrapped in the ApolloProvider.
 */
export const renderWithApolloClient = async (ui: ReactNode) =>
  await waitFor(() => {
    render(<ApolloProvider client={client}>{ui}</ApolloProvider>)
  })

/**
 * wrapper around react-test-renderer for creating components with ApolloProvider.
 * @param ui is the component to render.
 * @returns the rendered component, wrapped in the ApolloProvider.
 */
export const createWithApolloClient = (ui: ReactNode) =>
  renderer.create(<ApolloProvider client={client}>{ui}</ApolloProvider>)
