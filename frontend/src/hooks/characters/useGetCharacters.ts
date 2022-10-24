import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { FilterCharacterInput, useGetCharactersQuery } from 'src/graphql/generated/generated'

const useGetCharacters = (page: number, filter?: FilterCharacterInput) => {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 400)

  const { data, loading, error, refetch } = useGetCharactersQuery({
    variables: { page, filter },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    refetch({
      page,
      filter: { name: debouncedSearchInput, ...filter }
    })
  }, [page, debouncedSearchInput, filter])

  return { data, loading, error, searchInput, setSearchInput }
}

export default useGetCharacters
