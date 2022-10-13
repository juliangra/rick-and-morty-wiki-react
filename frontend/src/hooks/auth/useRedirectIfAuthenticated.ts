import { useEffect } from 'react'
import useIsAuthenticated from './useAuthentication'
import useRedirect from './useRedirect'

/**
 * Redirects user to index ('/') is already authenticated
 */
const useRedirectIfAuthenticated = () => {
  const { isAuthenticated } = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated) {
      useRedirect('/')
    }
  }, [isAuthenticated])
}

export default useRedirectIfAuthenticated
