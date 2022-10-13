import { Center, Grid, Group, Image, RingProgress, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import {
  Order,
  useGetCharacterByIdQuery,
  useGetRatingStatsByCharacterIdQuery
} from 'src/graphql/generated/generated'
import View from '../View'

const CharacterView = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!id || !parseInt(id)) {
      navigate('/404')
    }
  }, [id])

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
      navigate('/characters')
    }
  }, [characterData])

  // TODO: Use these to sort
  const {
    data: ratingStatsData,
    loading: ratingStatsLoading,
    error: ratingStatsError
  } = useGetRatingStatsByCharacterIdQuery({
    variables: { characterId: id as string, order: Order.Desc }
  })

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
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: averageRating, color: 'blue' }]}
                label={<Center>{averageRating}</Center>}
              />

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  Ratings
                </Text>
                <Text weight={700} size="xl">
                  {numberOfRatings}
                </Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Center>
    </View>
  )
}

export default CharacterView
