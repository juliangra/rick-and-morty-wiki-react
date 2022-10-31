import { Box, Button, Card, Center, Divider, Grid, Group, Image, Text, Title } from '@mantine/core'
import { IconChevronLeft, IconStars } from '@tabler/icons'
import { useNavigate, useParams } from 'react-router'
import DeleteRatingButton from 'src/components/characters/DeleteRatingButton'
import Label from 'src/components/characters/Label'
import RatingModal from 'src/components/characters/RatingModal'
import Stats from 'src/components/characters/Stats'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import useAuthentication from 'src/hooks/auth/useAuthentication'
import useGetRatingByCharacterId from 'src/hooks/characters/useGetRatingByCharacterId'
import useRedirectIfInvalidCharacterId from 'src/hooks/characters/useRedirectIfInvalidId'
import { ratingModalIsOpenVar } from 'src/state/character'

const CharacterView = () => {
  const navigate = useNavigate()
  const { id: characterId } = useParams()
  useRedirectIfInvalidCharacterId(characterId)

  // Get user session
  const { isAuthenticated, decoded } = useAuthentication()
  const userId = decoded?.id || ''

  // Get all necessary data about a character and rating
  const { characterData, ratingStatsData, hasRatedCharacterData, loading, error, refetch } =
    useGetRatingByCharacterId(characterId as string, userId)

  const { name, image, status, species, gender, location } = characterData?.character || {}

  const averageRating = ratingStatsData?.ratingStatsByCharacterId.average || 0
  const numberOfRatings = ratingStatsData?.ratingStatsByCharacterId.count || 0
  const hasRatedCharacter = hasRatedCharacterData?.hasRatedCharacter || false

  return (
    <Box>
      {loading ? (
        <CustomLoading />
      ) : error || !characterData?.character ? (
        <CustomError />
      ) : (
        <Box>
          <RatingModal characterId={characterId as string} userId={userId} refetch={refetch} />
          <Button
            leftIcon={<IconChevronLeft size={16} />}
            onClick={() => {
              navigate('/characters')
            }}>
            Back
          </Button>
          <Center>
            <Card shadow="sm" style={{ width: '320px', marginTop: 10 }} withBorder>
              <Grid>
                <Grid.Col span={12}>
                  <Group style={{ justifyContent: 'center', marginBottom: 10 }}>
                    <Title order={2}>{name}</Title>

                    <Group style={{ maxWidth: '250px' }}>
                      {image && (
                        <Image
                          src={image}
                          radius="md"
                          alt={name || 'An image of a Rick and Morty character'}
                        />
                      )}
                    </Group>
                  </Group>

                  <Text size="xl" weight="bold" color="indigo">
                    Personal details
                  </Text>

                  <Divider my={5} />

                  <Label label={'Status'} value={status} />
                  <Label label={'Species'} value={species} />
                  <Label label={'Gender'} value={gender} />

                  <Text size="xl" weight="bold" color="indigo">
                    Location
                  </Text>

                  <Divider mt={5} mb={10} />

                  <Label label={'Name'} value={location} />

                  <Divider my={10} />

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
                  <Divider />
                  <Group mt={10}>
                    {isAuthenticated && (
                      <>
                        <Button
                          variant="light"
                          leftIcon={<IconStars size={18} />}
                          onClick={() => ratingModalIsOpenVar(true)}
                          style={{ flex: 1 }}>
                          Rate
                        </Button>

                        {hasRatedCharacter && (
                          <DeleteRatingButton
                            characterId={characterId as string}
                            userId={userId}
                            refetch={refetch}
                          />
                        )}
                      </>
                    )}
                  </Group>
                </Grid.Col>
              </Grid>
            </Card>
          </Center>
        </Box>
      )}
    </Box>
  )
}

export default CharacterView
