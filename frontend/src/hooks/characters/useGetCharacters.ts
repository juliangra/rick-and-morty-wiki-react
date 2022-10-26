import { useReactiveVar } from '@apollo/client'
import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useGetCharactersQuery } from 'src/graphql/generated/generated'
import { filterVar } from 'src/state/dashboard'

/**
 * A wrapper hook for `useGetCharactersQuery`,
 * responsible for fetching characters and handling loading and error states.
 * @param page is the page number to fetch.
 *
 * @returns all necessary values and handlers for fetching characters.
 */
const useGetCharacters = (page: number) => {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput] = useDebouncedValue(searchInput, 400)
  const filter = useReactiveVar(filterVar)

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
