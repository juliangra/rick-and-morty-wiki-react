import { screen } from '@testing-library/react'
import DashboardView from '../../views/DashboardView'
import { renderWithProviders } from '../../utils/tests/render'

describe('DashboardView', () => {
  it('initially loads with loading state', async () => {
    await renderWithProviders(<DashboardView />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
