import { useEffect } from 'react'
import {
  useGetRatingQuery,
  useGetRatingStatsByCharacterIdQuery,
  useHasRatedCharacterQuery
} from 'src/graphql/generated/generated'
import { currentRatingVar } from 'src/state/character'
import useGetCharacterById from './useGetCharacterById'

/**
 * A wrapper hook for all the queries related to a character's rating.
 *
 * @param characterId is the id of the character to get the rating for.
 * @param userId is the id of the currently logged in user
 * @returns all necessary values and handlers for fetching a character's rating.
 */
const useGetRatingByCharacterId = (characterId: string, userId: string) => {
  // Get character
  const {
    data: characterData,
    loading: characterLoading,
    error: characterError
  } = useGetCharacterById(characterId as string)

  // Get rating stats
  const {
    data: ratingStatsData,
    loading: ratingStatsLoading,
    error: ratingStatsError,
    refetch: refetchRatingStats
  } = useGetRatingStatsByCharacterIdQuery({
    variables: { characterId }
  })

  // Check if user has rated character
  const {
    data: hasRatedCharacterData,
    loading: hasRatedCharacterLoading,
    error: hasRatedCharacterError,
    refetch: refetchHasRatedCharacter
  } = useHasRatedCharacterQuery({
    variables: {
      characterId,
      userId
    }
  })

  // Get rating
  const {
    data: ratingData,
    loading: ratingLoading,
    error: ratingError,
    refetch: refetchRating
  } = useGetRatingQuery({
    variables: {
      characterId: characterId as string,
      userId: userId
    }
  })

  const rating = ratingData?.rating

  // Set the reactive variable once the rating has loaded
  useEffect(() => {
    currentRatingVar(rating?.value || 0)
  }, [rating])

  /**
   * Refetches neccessary data in a batch.
   */
  const refetch = () => {
    refetchRatingStats()
    refetchHasRatedCharacter()
    refetchRating()
  }

  const loading =
    characterLoading || ratingStatsLoading || hasRatedCharacterLoading || ratingLoading
  const error = characterError || ratingStatsError || hasRatedCharacterError || ratingError

  return {
    characterData,
    ratingStatsData,
    hasRatedCharacterData,
    ratingData,
    loading,
    error,
    refetch
  }
}

export default useGetRatingByCharacterId
