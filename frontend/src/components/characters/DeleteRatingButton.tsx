import { ActionIcon, ActionIconProps } from '@mantine/core'
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
    <ActionIcon color="red" radius="md" variant="light" onClick={handleOnClick}>
      <IconTrash size={18} />
    </ActionIcon>
  )
}

export default DeleteRatingButton
