import { useHotkeys } from '@mantine/hooks'
import { useNavigate } from 'react-router'

/**
 * This hook will navigate to the characters page when the user presses the
 * meta key + k.
 */
const useNavigateToCharactersWithHotkey = () => {
  const navigate = useNavigate()
  useHotkeys([['meta+K', () => navigate('/characters')]])
}

export default useNavigateToCharactersWithHotkey
