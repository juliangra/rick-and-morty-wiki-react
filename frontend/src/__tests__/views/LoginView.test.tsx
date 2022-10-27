import { screen } from '@testing-library/react'
import setupReactPortal from 'src/utils/tests/portals'
import LoginView from 'src/views/auth/LoginView'
import { createWithProviders, renderWithProviders } from '../../utils/tests/render'

describe('LoginView', () => {
  setupReactPortal()

  it('matches snapshot', () => {
    const component = createWithProviders(<LoginView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('loads with identifier and password input', async () => {
    await renderWithProviders(<LoginView />)
    expect(screen.getByTestId('identifier-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
  })
})
