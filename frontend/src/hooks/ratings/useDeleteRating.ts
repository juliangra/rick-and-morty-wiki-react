import { useDeleteRatingMutation } from 'src/graphql/generated/generated'
import useShowNotification from '../notifications/useShowNotification'

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

    useShowNotification({ message: 'Successfully deleted rating' })
  }

  return {
    handleOnClick
  }
}

export default useDeleteRating
