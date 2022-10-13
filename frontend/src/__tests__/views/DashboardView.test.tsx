import { screen } from '@testing-library/react'
import DashboardView from '../../views/DashboardView'
import { createWithProviders, renderWithProviders } from '../../utils/tests/render'

describe('DashboardView', () => {
  it('matches snapshot', () => {
    const component = createWithProviders(<DashboardView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('initially loads with loading state', async () => {
    await renderWithProviders(<DashboardView />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})

export {}
