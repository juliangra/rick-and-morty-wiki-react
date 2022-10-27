import { RatingSchema } from 'src/schemas/rating'
import { Rating } from 'src/types/rating'

/**
 * Test the RatingSchema.
 * @param data is the data to test.
 *
 * @returns a boolean indicating whether the data is valid.
 */
const isValid = (data: Rating) => {
  try {
    RatingSchema.parse(data)
  } catch (error) {
    if (error) {
      return false
    }
  }

  return true
}

describe('Rating', () => {
  const tooLowRating: Rating = 0
  const validRating: Rating = 5
  const tooHighRating: Rating = 6

  it('only allows valid rating', () => {
    expect(isValid(tooLowRating)).toBe(false)
    expect(isValid(validRating)).toBe(true)
    expect(isValid(tooHighRating)).toBe(false)
  })
})
