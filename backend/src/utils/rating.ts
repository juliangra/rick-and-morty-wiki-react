import { RatingValue } from '../generated/graphql'

export const ratingToNumber = (rating: RatingValue) => {
  switch (rating) {
    case RatingValue.One:
      return 1
    case RatingValue.Two:
      return 2
    case RatingValue.Three:
      return 3
    case RatingValue.Four:
      return 4
    case RatingValue.Five:
      return 5
  }
}

export const numberToRating = (rating: number) => {
  switch (rating) {
    case 1:
      return RatingValue.One
    case 2:
      return RatingValue.Two
    case 3:
      return RatingValue.Three
    case 4:
      return RatingValue.Four
    case 5:
      return RatingValue.Five
    default:
      return RatingValue.One
  }
}
