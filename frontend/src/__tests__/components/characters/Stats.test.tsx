import { screen } from '@testing-library/react'
import Stats from 'src/components/characters/Stats'
import { createWithProviders, renderWithProviders } from 'src/utils/tests/render'

describe('Stats', () => {
  it('matches snapshot', () => {
    const component = createWithProviders(<Stats rating={1} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correct label', async () => {
    const rating = 5
    await renderWithProviders(<Stats rating={rating} testId={'stats'} />)
    expect(screen.getByTestId('stats')).toHaveTextContent(String(rating))
  })

  it('renders label with 1 decimal place', async () => {
    const rating = 3.33333
    await renderWithProviders(<Stats rating={rating} testId={'stats'} />)
    expect(screen.getByTestId('stats')).toHaveTextContent(String(rating.toFixed(1)))
  })
})
