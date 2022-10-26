import { Box, Button, Center, Grid, Group, Image, Text } from '@mantine/core'
import { useNavigate, useParams } from 'react-router'
import DeleteRatingButton from 'src/components/characters/DeleteRatingButton'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import RatingSlider from 'src/components/characters/RatingSlider'
import Stats from 'src/components/characters/Stats'
import useAuthentication from 'src/hooks/auth/useAuthentication'
import useRedirectIfInvalidCharacterId from 'src/hooks/characters/useRedirectIfInvalidId'
import { IconChevronLeft } from '@tabler/icons'
import useGetCharacterById from 'src/hooks/characters/useGetCharacterById'
import useGetRatingByCharacterId from 'src/hooks/characters/useGetRatingByCharacterId'

const CharacterView = () => {
  const navigate = useNavigate()
  const { id: characterId } = useParams()
  useRedirectIfInvalidCharacterId(characterId)

  // Get character
  const {
    data: characterData,
    loading: characterLoading,
    error: characterError
  } = useGetCharacterById(characterId as string)

  // Get user session
  const { isAuthenticated, decoded } = useAuthentication()
  const userId = decoded?.id || ''

  // Get all necessary data about a rating
  const { ratingData, ratingStatsData, hasRatedCharacterData, loading, error, refetch } =
    useGetRatingByCharacterId(characterId as string, userId)

  if (loading || characterLoading) return <CustomLoading />
  if (error || characterError) return <CustomError />

  const character = characterData?.character
  const averageRating = ratingStatsData?.ratingStatsByCharacterId.average || 0
  const numberOfRatings = ratingStatsData?.ratingStatsByCharacterId.count || 0

  return (
    <Center>
      <Grid style={{ width: '80%' }}>
        <Grid.Col>
          <Button
            leftIcon={<IconChevronLeft size={16} />}
            onClick={() => {
              navigate(-1)
            }}>
            Back
          </Button>
          <Text size="xl">{character?.name}</Text>

          {isAuthenticated && (
            <Box
              style={{
                width: '20%'
              }}>
              <RatingSlider
                characterId={characterId as string}
                userId={userId}
                refetch={refetch}
                value={ratingData?.rating?.value}
              />
              {hasRatedCharacterData?.hasRatedCharacter ? (
                <DeleteRatingButton
                  characterId={characterId as string}
                  userId={userId}
                  refetch={refetch}
                />
              ) : (
                <Text>No rating given yet</Text>
              )}
            </Box>
          )}

          <Group style={{ width: '25%' }}>
            {character?.image && (
              <Image
                src={character?.image}
                radius="md"
                alt={character.name || 'An image of a Rick and Morty character'}
              />
            )}
          </Group>

          <Text size="xl">Personal details</Text>
          <Text size="md">Status: {character?.status}</Text>
          <Text size="md">Species: {character?.species}</Text>
          <Text size="md">Gender: {character?.gender}</Text>

          {character?.location && (
            <>
              <Text size="xl">Location</Text>
              <Text size="md">Name: {character.location}</Text>
            </>
          )}

          <Group>
            <Grid>
              <Grid.Col>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  Average rating
                </Text>
                <Stats rating={averageRating} />
              </Grid.Col>
            </Grid>

            <Box>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                Number of ratings
              </Text>
              <Text weight={700} size="xl">
                {numberOfRatings}
              </Text>
            </Box>
          </Group>
        </Grid.Col>
      </Grid>
    </Center>
  )
}

export default CharacterView
