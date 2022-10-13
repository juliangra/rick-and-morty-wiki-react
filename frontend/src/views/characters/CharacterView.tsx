import { Center, Grid, Group, Image, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import { useGetCharacterByIdQuery } from 'src/graphql/generated/generated'
import View from '../View'

const CharacterView = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (!id || !parseInt(id)) {
      navigate('/404')
    }
  }, [id])

  const { data, loading, error } = useGetCharacterByIdQuery({
    variables: {
      characterId: id as string
    }
  })

  if (loading) {
    return <CustomLoading />
  }

  if (error) {
    return <CustomError description="An unexpected error occurred when fetching data." overlay />
  }

  const character = data?.character

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
          </Grid.Col>
        </Grid>
      </Center>
    </View>
  )
}

export default CharacterView
