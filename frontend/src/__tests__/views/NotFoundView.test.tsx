import NotFoundView from 'src/views/NotFoundView'
import { createWithProviders, renderWithProviders } from '../../utils/tests/render'
import { screen, waitFor } from '@testing-library/react'

describe('NotFoundView', () => {
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

export {}
