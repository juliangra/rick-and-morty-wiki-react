import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useGetCharactersQuery } from 'src/graphql/generated/generated'

const useGetCharacters = (page: number) => {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 250)

  const { data, loading, error, refetch } = useGetCharactersQuery({
    variables: { page }
  })

  useEffect(() => {
    refetch({ page: page, filter: { name: debouncedSearchInput } })
  }, [page, debouncedSearchInput])

  return { data, loading, error, searchInput, setSearchInput }
}

export default useGetCharacters
