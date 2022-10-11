import { Outlet, useParams } from 'react-router'
import { Box, Center, Container, Grid, Pagination, Text, TextInput } from '@mantine/core'
import CharacterCard from 'src/components/CharacterCard'
import { useGetCharactersQuery } from 'src/graphql/generated/generated'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import CustomLoading from 'src/components/common/CustomLoading'

const DashboardView = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 250)

  const { data, loading, refetch } = useGetCharactersQuery({
    variables: { page }
  })

  useEffect(() => {
    refetch({ page: page, filter: { name: debouncedSearchInput } })
  }, [page, debouncedSearchInput])

  const characters = data?.characters?.results
  const numberOfPages = data?.characters?.info?.pages || 0

  if (loading) {
    return <CustomLoading />
  }

  return (
    <Box>
      {!id ? (
        <Container>
          <Text size="xl">Characters</Text>
          <TextInput
            label="Search for a character"
            value={searchInput}
            style={{ flex: 1 }}
            my={24}
            onChange={(event) => setSearchInput(event.currentTarget.value)}
            data-testid="search-input"
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
  )
}

export default DashboardView
