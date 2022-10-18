import { Center, RingProgress } from '@mantine/core'
import { MAX_RATING } from 'src/constants/rating'

type StatsProps = {
  rating: number
  testId?: string
}

const Stats: React.FC<StatsProps> = ({ rating, testId }) => {
  // The rating is a number between 0 and 100, but our implementation of rating is between 0 and 5
  const calculatedRating = (rating * 100) / MAX_RATING

  return (
    <RingProgress
      size={80}
      roundCaps
      thickness={8}
      sections={[{ value: calculatedRating, color: 'indigo' }]}
      label={<Center>{rating.toFixed(1)}</Center>}
      data-testid={testId}
      data-cy={testId}
    />
  )
}

export default Stats
