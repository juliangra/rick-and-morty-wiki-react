import moment from 'moment'
import { DefaultRatingFragment } from 'src/graphql/generated/generated'

export const getTimeSince = (time: string) => moment(parseInt(time)).fromNow()

export const userHasRatings = (ratings: DefaultRatingFragment[]) => ratings && ratings.length > 0

export const formatRatingStats = (ratings: DefaultRatingFragment[]) => {
  const count = ratings.length
  const suffix = count !== 1 ? 's' : ''
  return `${count} rating${suffix}`
}
