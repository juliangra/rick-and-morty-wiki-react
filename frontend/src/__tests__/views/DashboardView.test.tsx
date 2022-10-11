import { screen } from '@testing-library/react'
import DashboardView from '../../views/DashboardView'
import { createWithApolloClient, renderWithApolloClient } from '../../utils/tests/render'

describe('DashboardView', () => {
  it('matches snapshot', () => {
    const component = createWithApolloClient(<DashboardView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('initially loads with loading state', async () => {
    await renderWithApolloClient(<DashboardView />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})

export {}
