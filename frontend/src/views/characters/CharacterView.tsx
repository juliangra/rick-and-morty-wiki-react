import { Box, Center, Grid, Group, Image, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import DeleteRatingButton from 'src/components/characters/DeleteRatingButton'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import RatingSlider from 'src/components/characters/RatingSlider'
import Stats from 'src/components/characters/Stats'
import {
  Order,
  useGetCharacterByIdQuery,
  useGetRatingQuery,
  useGetRatingStatsByCharacterIdQuery,
  useHasRatedCharacterQuery
} from 'src/graphql/generated/generated'
import useAuthentication from 'src/hooks/auth/useAuthentication'
import useRedirectIfInvalidId from 'src/hooks/characters/useRedirectIfInvalidId'
import View from '../View'

const CharacterView = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  useRedirectIfInvalidId(id)

  const {
    data: characterData,
    loading: characterLoading,
    error: characterError
  } = useGetCharacterByIdQuery({
    variables: {
      characterId: id as string
    }
  })

  useEffect(() => {
    if (characterData && !characterData.character) {
      navigate('/404')
    }
  }, [characterData])

  const {
    data: ratingStatsData,
    loading: ratingStatsLoading,
    error: ratingStatsError,
    refetch: refetchRatingStats
  } = useGetRatingStatsByCharacterIdQuery({
    variables: { characterId: id as string, order: Order.Desc }
  })

  const { isAuthenticated, decoded } = useAuthentication()
  const userId = decoded?.id || ''

  const { data: hasRatedCharacterData, refetch: refetchHasRatedCharacter } =
    useHasRatedCharacterQuery({
      variables: {
        characterId: id as string,
        userId: userId
      }
    })

  const { data: ratingData, refetch: refetchRating } = useGetRatingQuery({
    variables: {
      characterId: id as string,
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

  if (characterLoading || ratingStatsLoading) {
    return <CustomLoading />
  }

  if (characterError || ratingStatsError) {
    return <CustomError />
  }

  const character = characterData?.character
  const averageRating = ratingStatsData?.ratingStatsByCharacterId.average || 0
  const numberOfRatings = ratingStatsData?.ratingStatsByCharacterId.count || 0

  return (
    <View>
      <Center>
        <Grid style={{ width: '80%' }}>
          <Grid.Col>
            <Text size="xl">{character?.name}</Text>

            {isAuthenticated && (
              <Box
                style={{
                  width: '20%'
                }}>
                <RatingSlider
                  characterId={id as string}
                  userId={userId}
                  refetch={refetch}
                  value={ratingData?.rating?.value}
                />
                {hasRatedCharacterData?.hasRatedCharacter ? (
                  <DeleteRatingButton
                    characterId={id as string}
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
                <Text size="md">Name: {character.location.name}</Text>
                <Text size="md">Dimension: {character.location.dimension}</Text>
                <Text size="md">Type: {character.location.type}</Text>
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
    </View>
  )
}

export default CharacterView
