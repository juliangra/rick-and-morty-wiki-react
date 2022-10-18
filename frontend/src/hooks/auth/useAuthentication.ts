import { useLocalStorage } from '@mantine/hooks'
import { JWT_SECRET } from 'src/constants/index'
import jwt from 'jsonwebtoken'
import useRedirect from './useRedirect'
import { DecodedToken } from 'src/types/auth'

/**
 * Custom hook that signs in, signs out and verifies authentication status.
 *
 * Saves, removes and validates JWT token in local storage.
 *
 * @returns object with JWT token, authentication status, signIn and signOut functions
 */
const useAuthentication = () => {
  const [token, setToken, removeToken] = useLocalStorage({ key: 'jwt' })

  const signIn = (jwt: string) => {
    setToken(jwt)
  }

  const signOut = () => {
    removeToken()
    useRedirect('/')
  }

  const isAuthenticated = (token ? jwt.verify(token, JWT_SECRET, (err) => !err) : false) as boolean
  const decoded = (token ? jwt.verify(token, JWT_SECRET) : null) as DecodedToken | null

  return { token, isAuthenticated, signIn, signOut, decoded }
}

export default useAuthentication
