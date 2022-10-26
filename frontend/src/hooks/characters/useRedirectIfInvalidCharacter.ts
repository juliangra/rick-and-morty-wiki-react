import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { GetCharacterByIdQuery } from 'src/graphql/generated/generated'

/**
 * Redirects to the /404 page if the character data is `undefined`.
 * @param data is the character data to check.
 */
const useRedirectIfInvalidCharacter = (data?: GetCharacterByIdQuery) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !data.character) {
      navigate('/404')
    }
  }, [data])
}

export default useRedirectIfInvalidCharacter
