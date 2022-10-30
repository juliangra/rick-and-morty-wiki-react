import { screen } from '@testing-library/react'
import setupReactPortal from 'src/utils/tests/portals'
import { renderWithProviders } from '../../utils/tests/render'
import DashboardView from '../../views/DashboardView'

describe('DashboardView', () => {
  setupReactPortal()

  it('initially loads with loading state', async () => {
    await renderWithProviders(<DashboardView />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
