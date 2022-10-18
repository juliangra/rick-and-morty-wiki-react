import { createWithProviders, renderWithProviders } from 'src/utils/tests/render'
import { screen, waitFor } from '@testing-library/react'
import RatingSlider from 'src/components/characters/RatingSlider'
import { FALLBACK_VALUE } from 'src/constants/rating'

describe('RatingSlider', () => {
  it('matches snapshot', () => {
    const component = createWithProviders(
      <RatingSlider characterId={''} userId={''} refetch={() => {}} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders with fallback value if no value is provided', async () => {
    await renderWithProviders(<RatingSlider characterId={''} userId={''} refetch={() => {}} />)

    await waitFor(() => {
      // This is a workaround due to the value of the `input` element
      // being a nested child of the element with the role `slider`
      expect(screen.getByRole('slider')).toContainHTML(`aria-valuenow="${FALLBACK_VALUE}"`)
    })
  })
})

export {}
