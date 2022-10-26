import {
  useGetRatingQuery,
  useGetRatingStatsByCharacterIdQuery,
  useHasRatedCharacterQuery
} from 'src/graphql/generated/generated'

/**
 * A wrapper hook for all the queries related to a character's rating.
 *
 * @param characterId is the id of the character to get the rating for.
 * @param userId is the id of the currently logged in user
 * @returns all necessary values and handlers for fetching a character's rating.
 */
const useGetRatingByCharacterId = (characterId: string, userId: string) => {
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

  /**
   * Refetches neccessary data in a batch.
   */
  const refetch = () => {
    refetchRatingStats()
    refetchHasRatedCharacter()
    refetchRating()
  }

  const loading = ratingStatsLoading || hasRatedCharacterLoading || ratingLoading
  const error = ratingStatsError || hasRatedCharacterError || ratingError

  return {
    ratingStatsData,
    hasRatedCharacterData,
    ratingData,
    loading,
    error,
    refetch
  }
}

export default useGetRatingByCharacterId
