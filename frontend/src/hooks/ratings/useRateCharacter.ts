import { useEffect, useState } from 'react'
import { FALLBACK_VALUE } from 'src/constants/rating'
import { useRateCharacterMutation } from 'src/graphql/generated/generated'
import { RatingSchema } from 'src/schemas/rating'
import { numberToRating } from 'src/utils/rating'
import { ZodError } from 'zod'

type RateCharacterProps = {
  characterId: string
  userId: string
  refetch: () => void
  defaultValue?: number
}

/**
 * Handles logic related to rating a character.
 *
 * The `rating` state is the current rating of the character,
 * and is not mutated until the user is finished changing the input.
 *
 * @param characterId is the ID of the character to rate.
 * @param userId is the current user's ID.
 * @param refetch is a function that refetches the character's ratings.
 * @param defaultRating is the initial rating of the character.
 * @returns an object with values and handlers for rating a character.
 */
const useRateCharacter = ({ characterId, userId, refetch, defaultValue }: RateCharacterProps) => {
  const initialValue = defaultValue ?? FALLBACK_VALUE

  const [ratingOnChange, setRatingOnChange] = useState(initialValue)
  const [rating, setRating] = useState(initialValue)
  const [error, setError] = useState<string | undefined>(undefined)
  const [rateCharacter, { data, loading }] = useRateCharacterMutation()

  const onChange = (value: number) => {
    setRatingOnChange(value)
  }

  const onChangeEnd = async (value: number) => {
    // Ensure value is a valid rating
    try {
      RatingSchema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message)
        return
      }
    }

    setRating(value)

    await rateCharacter({
      variables: {
        characterId,
        userId,
        value: numberToRating(value)
      }
    })
  }

  useEffect(() => {
    refetch()
  }, [data])

  return { ratingOnChange, rating, error, onChange, onChangeEnd, loading }
}

export default useRateCharacter