import { Box, Slider, SliderProps } from '@mantine/core'
import { MAX_RATING } from 'src/constants/rating'
import useRateCharacter from 'src/hooks/ratings/useRateCharacter'
import CustomError from '../common/CustomError'
import CustomLoading from '../common/CustomLoading'

interface RatingSliderProps extends SliderProps {
  characterId: string
  userId: string
  testId?: string
  refetch: () => void
}

const RatingSlider: React.FC<RatingSliderProps> = ({
  characterId,
  userId,
  testId,
  refetch,
  value
}) => {
  const { ratingOnChange, onChange, onChangeEnd, loading, error } = useRateCharacter({
    characterId,
    userId,
    refetch,
    defaultValue: value
  })

  return (
    <Box style={{ marginTop: 24, marginBottom: 24 }}>
      {error && <CustomError description={error} />}
      {loading && <CustomLoading />}
      <Slider
        value={ratingOnChange}
        step={1}
        min={1}
        max={MAX_RATING}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        data-testid={testId}
        data-cy={testId}
      />
    </Box>
  )
}

export default RatingSlider
