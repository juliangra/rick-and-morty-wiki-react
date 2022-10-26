import { useDeleteRatingMutation } from 'src/graphql/generated/generated'
import useRedirect from '../auth/useRedirect'

type DeleteRatingProps = {
  characterId: string
  userId: string
  refetch: () => void
}

/**
 * Handles logic related to deleting a rating.
 *
 * @returns an object with values and handlers for deleting a rating.
 */
const useDeleteRating = ({ characterId, userId, refetch }: DeleteRatingProps) => {
  const [deleteRating] = useDeleteRatingMutation({
    variables: {
      characterId,
      userId
    }
  })

  const handleOnClick = async () => {
    await deleteRating({
      variables: {
        characterId,
        userId
      }
    })

    refetch()

    // Refresh current page
    useRedirect(location.hash)
  }

  return {
    handleOnClick
  }
}

export default useDeleteRating
