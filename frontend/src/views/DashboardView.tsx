import { Outlet, useParams } from 'react-router'
import { Box, Button, Center, Container, Grid, Group, Pagination, Text } from '@mantine/core'
import CharacterCard from 'src/components/characters/CharacterCard'
import { useState } from 'react'
import CustomLoading from 'src/components/common/CustomLoading'
import View from './View'
import useGetCharacters from 'src/hooks/characters/useGetCharacters'
import CustomError from 'src/components/common/CustomError'
import TextField from 'src/components/forms/TextField'
import { IconFilter, IconX, IconZoomCancel } from '@tabler/icons'
import FilterDrawer from 'src/components/filter/FilterDrawer'
import { filterDrawerIsOpenVar } from 'src/state/dashboard'

const DashboardView = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)

  const { data, loading, error, searchInput, setSearchInput } = useGetCharacters(page)

  const characters = data?.characters?.results
  const numberOfPages = data?.characters?.info?.pages || 0
  const charactersFound = characters?.length !== 0

  return (
    <View>
      <FilterDrawer />
      <Box>
        {!id ? (
          <Container>
            {error && <CustomError />}
            <Text size="xl">Characters</Text>
            <Text>Search for any character from any episode of Rick and Morty</Text>
            <Group>
              <Button
                leftIcon={<IconFilter size={16} />}
                onClick={() => filterDrawerIsOpenVar(true)}
              >
                Filter
              </Button>
            </Group>

            <TextField
              label="Search for a character"
              value={searchInput}
              style={{ flex: 1 }}
              my={24}
              autoFocus
              rightSection={searchInput && <IconX size={16} onClick={() => setSearchInput('')} />}
              styles={{ rightSection: { cursor: 'pointer' } }}
              onChange={(event) => setSearchInput(event.currentTarget.value)}
              data-testid="search-input"
            />
            {charactersFound ? (
              <>
                <Grid data-testid="characters-container" data-cy="characters-container">
                  {loading ? (
                    <CustomLoading />
                  ) : (
                    characters?.map((character) => (
                      <Grid.Col span={4} key={character?.id}>
                        <CharacterCard character={character} />
                      </Grid.Col>
                    ))
                  )}
                </Grid>

                <Center style={{ marginTop: 24, marginBottom: 24 }}>
                  <Pagination page={page} onChange={setPage} total={numberOfPages} size="xl" />
                </Center>
              </>
            ) : (
              <Center style={{ display: 'flex' }}>
                <IconZoomCancel />
                <Text ml={5}>No characters found with current filters</Text>
              </Center>
            )}
          </Container>
        ) : (
          <Outlet />
        )}
      </Box>
    </View>
  )
}

export default DashboardView
