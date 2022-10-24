import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { LocalStorageKey } from '../../types/storage'

/**
 * Manages the theme state persistently in the local storage.
 **/
const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'theme' as LocalStorageKey,
    defaultValue: 'dark' as ColorScheme
  })

  const toggleColorScheme = () => {
    setColorScheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }

  return [colorScheme, toggleColorScheme] as const
}

export default useColorScheme
