import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  MediaQuery,
  Pagination,
  Text
} from '@mantine/core'
import { IconFilter, IconX, IconZoomCancel } from '@tabler/icons'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router'
import CharacterCard from 'src/components/characters/CharacterCard'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import FilterDrawer from 'src/components/filter/FilterDrawer'
import TextField from 'src/components/forms/TextField'
import MobilePagination from 'src/components/pagination/MobilePagination'
import useGetCharacters from 'src/hooks/characters/useGetCharacters'
import { filterDrawerIsOpenVar } from 'src/state/dashboard'
import View from './View'

const DashboardView = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)

  const { data, loading, error, searchInput, setSearchInput } = useGetCharacters(page)

  const characters = data?.characters?.results
  const numberOfPages = data?.characters?.info?.pages || 0
  const charactersFound = characters?.length !== 0

  return (
    <View>
      {loading ? (
        <CustomLoading />
      ) : error ? (
        <CustomError />
      ) : (
        <Box>
          <FilterDrawer />
          <Box>
            {!id ? (
              <Container>
                {error && <CustomError />}
                <Text size="xl">Characters</Text>
                <Text style={{ paddingTop: 12 }}>
                  Search for any character from any episode of Rick and Morty
                </Text>
                <Group style={{ paddingTop: 12 }}>
                  <MediaQuery smallerThan="sm" styles={{ width: '100%' }}>
                    <Button
                      leftIcon={<IconFilter size={16} />}
                      onClick={() => filterDrawerIsOpenVar(true)}
                      data-cy="filter-button"
                    >
                      Filter
                    </Button>
                  </MediaQuery>
                </Group>

                <TextField
                  label="Search for a character"
                  value={searchInput}
                  style={{ flex: 1 }}
                  my={24}
                  autoFocus
                  rightSection={
                    searchInput && (
                      <ActionIcon>
                        <IconX size={16} onClick={() => setSearchInput('')} />
                      </ActionIcon>
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') return
                    setSearchInput('')
                  }}
                  styles={{ rightSection: { cursor: 'pointer' } }}
                  onChange={(event) => setSearchInput(event.currentTarget.value)}
                  data-testid="search-input"
                  data-cy="search-bar"
                />
                {charactersFound ? (
                  <>
                    <Grid data-testid="characters-container" data-cy="characters-container">
                      {loading ? (
                        <CustomLoading />
                      ) : (
                        characters?.map((character) => (
                          <Grid.Col lg={4} xs={6} key={character?.id}>
                            <CharacterCard character={character} />
                          </Grid.Col>
                        ))
                      )}
                    </Grid>

                    <Center style={{ marginTop: 24, marginBottom: 24 }}>
                      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Pagination
                          page={page}
                          onChange={setPage}
                          total={numberOfPages}
                          size="xl"
                        />
                      </MediaQuery>

                      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <MobilePagination page={page} onChange={setPage} total={numberOfPages} />
                      </MediaQuery>
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
        </Box>
      )}
    </View>
  )
}

export default DashboardView
