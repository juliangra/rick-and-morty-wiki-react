import { RatingValue } from '../generated/graphql'
import { ratingToNumber } from './rating'

/**
 * @returns a random rating value as a number.
 */
export const getRandomRating = () => {
  const ratings = Object.values(RatingValue)
  const index = Math.floor(Math.random() * ratings.length)
  const rating = ratings[index]
  return ratingToNumber(rating)
}
