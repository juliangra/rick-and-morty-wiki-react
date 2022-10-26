import { useEffect } from 'react'
import { useNavigate } from 'react-router'

/**
 * A hook that redirects to the /404 page if the current dynamic ID is invalid.
 * @param id is the character ID to check.
 */
const useRedirectIfInvalidCharacterId = (id?: string) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || !parseInt(id)) {
      navigate('/404')
    }
  }, [id])
}

export default useRedirectIfInvalidCharacterId
