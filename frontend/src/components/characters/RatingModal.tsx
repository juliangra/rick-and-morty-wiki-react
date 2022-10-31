import { useReactiveVar } from '@apollo/client'
import { Box, Button, Center, Group, Modal, useMantineTheme } from '@mantine/core'
import { IconStar } from '@tabler/icons'
import { MAX_RATING } from 'src/constants/rating'
import useShowNotification from 'src/hooks/notifications/useShowNotification'
import useRateCharacter from 'src/hooks/ratings/useRateCharacter'
import { currentRatingVar, ratingModalIsOpenVar } from 'src/state/character'
import CustomError from '../common/CustomError'
import CustomLoading from '../common/CustomLoading'

interface RatingModalProps {
  characterId: string
  userId: string
  testId?: string
  refetch: () => void
}

const RatingModal: React.FC<RatingModalProps> = ({ characterId, userId, testId, refetch }) => {
  const theme = useMantineTheme()
  const isOpen = useReactiveVar(ratingModalIsOpenVar)
  const currentRating = useReactiveVar(currentRatingVar)
  const closeModal = () => ratingModalIsOpenVar(false)

  const { saveRating, loading, error } = useRateCharacter({
    characterId,
    userId,
    refetch,
    defaultValue: currentRating
  })

  const handleSaveRating = () => {
    if (currentRating <= 0) return

    saveRating(currentRating)
    closeModal()

    useShowNotification({ title: 'Success', message: 'Rating saved successfully.' })
  }

  const overlayColor = theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]

  return (
    <Box>
      {loading ? (
        <CustomLoading />
      ) : error ? (
        <CustomError />
      ) : (
        <Modal
          overlayColor={overlayColor}
          overlayOpacity={0.55}
          overlayBlur={3}
          opened={isOpen}
          title={'Rate character'}
          onClose={closeModal}
          data-testid={testId}
          data-cy={testId}>
          <Center style={{ flexDirection: 'column' }}>
            <Box>
              {Array(MAX_RATING)
                .fill(0)
                .map((_, i) => {
                  return (
                    <IconStar
                      size={35}
                      key={i}
                      onClick={() => currentRatingVar(i + 1)}
                      fill={i < currentRating ? theme.colors.yellow[5] : 'none'}
                      color={i < currentRating ? theme.colors.yellow[5] : theme.colors.gray[1]}
                    />
                  )
                })}
            </Box>
            <Group mt={5}>
              <Button onClick={closeModal} color="red" variant="light">
                Cancel
              </Button>
              <Button onClick={handleSaveRating}>Save rating</Button>
            </Group>
          </Center>
        </Modal>
      )}
    </Box>
  )
}

export default RatingModal
