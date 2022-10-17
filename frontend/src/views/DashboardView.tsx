import { Outlet, useParams } from 'react-router'
import { Box, Center, Container, Grid, Pagination, Text } from '@mantine/core'
import CharacterCard from 'src/components/CharacterCard'
import { useState } from 'react'
import CustomLoading from 'src/components/common/CustomLoading'
import View from './View'
import useGetCharacters from 'src/hooks/characters/useGetCharacters'
import CustomError from 'src/components/common/CustomError'
import TextField from 'src/components/forms/TextField'

const DashboardView = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)

  const { data, loading, error, searchInput, setSearchInput } = useGetCharacters(page)

  const characters = data?.characters?.results
  const numberOfPages = data?.characters?.info?.pages || 0

  if (loading) {
    return <CustomLoading />
  }

  return (
    <View>
      <Box>
        {!id ? (
          <Container>
            {error && <CustomError />}
            <Text size="xl">Characters</Text>
            <TextField
              label="Search for a character"
              value={searchInput}
              style={{ flex: 1 }}
              my={24}
              onChange={(event) => setSearchInput(event.currentTarget.value)}
              testid="search-input"
            />
            <Grid data-testid="characters-container" data-cy="characters-container">
              {characters?.map((character) => (
                <Grid.Col span={4} key={character?.id}>
                  <CharacterCard character={character} />
                </Grid.Col>
              ))}
            </Grid>

            <Center style={{ marginTop: 24, marginBottom: 24 }}>
              <Pagination page={page} onChange={setPage} total={numberOfPages} size="xl" />
            </Center>
          </Container>
        ) : (
          <Outlet />
        )}
      </Box>
    </View>
  )
}

export default DashboardView
