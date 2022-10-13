import { screen } from '@testing-library/react'
import { createWithProviders, renderWithProviders } from '../../utils/tests/render'
import RegisterView from 'src/views/auth/RegisterView'

describe('RegisterView', () => {
  it('matches snapshot', () => {
    const component = createWithProviders(<RegisterView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('loads with identifier and password input', async () => {
    await renderWithProviders(<RegisterView />)
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('username-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByTestId('repeatPassword-input')).toBeInTheDocument()
  })
})

export {}
