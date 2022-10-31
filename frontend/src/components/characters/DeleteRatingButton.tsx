import { ActionIconProps, Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import useDeleteRating from 'src/hooks/ratings/useDeleteRating'
import { currentRatingVar } from 'src/state/character'

interface DeleteRatingButtonProps extends ActionIconProps {
  characterId: string
  userId: string
  refetch: () => void
  testId?: string
}

const DeleteRatingButton: React.FC<DeleteRatingButtonProps> = ({
  characterId,
  userId,
  refetch,
  testId
}) => {
  const { handleOnClick } = useDeleteRating({
    characterId,
    userId,
    refetch
  })

  const handleDeleteRating = () => {
    handleOnClick()
    currentRatingVar(0)
  }

  return (
    <Button
      color="red"
      leftIcon={<IconTrash size={18} />}
      variant="light"
      onClick={handleDeleteRating}
      data-testid={testId}
      data-cy={testId}
    >
      Delete rating
    </Button>
  )
}

export default DeleteRatingButton
