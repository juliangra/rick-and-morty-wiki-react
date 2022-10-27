import { screen, waitFor } from '@testing-library/react'
import setupReactPortal from 'src/utils/tests/portals'
import NotFoundView from 'src/views/NotFoundView'
import { createWithProviders, renderWithProviders } from '../../utils/tests/render'

describe('NotFoundView', () => {
  setupReactPortal()

  it('matches snapshot', () => {
    const component = createWithProviders(<NotFoundView />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('includes 404', async () => {
    await renderWithProviders(<NotFoundView />)
    await waitFor(() => {
      expect(screen.getByTestId('heading')).toHaveTextContent('404')
    })
  })
})
