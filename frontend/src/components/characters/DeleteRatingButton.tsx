import { ActionIconProps, Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import useDeleteRating from 'src/hooks/ratings/useDeleteRating'

interface DeleteRatingButtonProps extends ActionIconProps {
  characterId: string
  userId: string
  refetch: () => void
}

const DeleteRatingButton: React.FC<DeleteRatingButtonProps> = ({
  characterId,
  userId,
  refetch
}) => {
  const { handleOnClick } = useDeleteRating({
    characterId,
    userId,
    refetch
  })

  return (
    <Button color="red" leftIcon={<IconTrash size={18} />} variant="light" onClick={handleOnClick}>
      Delete rating
    </Button>
  )
}

export default DeleteRatingButton
