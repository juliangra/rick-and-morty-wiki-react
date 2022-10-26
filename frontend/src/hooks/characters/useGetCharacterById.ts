import { useGetCharacterByIdQuery } from 'src/graphql/generated/generated'
import useRedirectIfInvalidCharacter from './useRedirectIfInvalidCharacter'

/**
 * Wrapper hook for `useGetCharacterByIdQuery`.
 *
 * Redirects if the provided value is not a valid character id.
 *
 * @param id is the ID of the character to fetch.
 * @returns all necessary fetch states.
 */
const useGetCharacterById = (id: string) => {
  const { data, loading, error } = useGetCharacterByIdQuery({
    variables: {
      characterId: id
    }
  })

  useRedirectIfInvalidCharacter(data)

  return { data, loading, error }
}

export default useGetCharacterById
