import {
  ActionIcon,
  Affix,
  Box,
  Burger,
  Button,
  Group,
  MediaQuery,
  Menu,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import {
  IconArrowUp,
  IconClipboardText,
  IconLogin,
  IconLogout,
  IconMoonStars,
  IconSearch,
  IconSun,
  IconUserPlus
} from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'
import useIsAuthenticated from 'src/hooks/auth/useAuthentication'
import useNavigateToCharactersWithHotkey from 'src/hooks/common/useNavigateToCharactersWithHotkey'

const HeaderContent = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const isDark = colorScheme === 'dark'

  const { isAuthenticated, signOut } = useIsAuthenticated()
  const navigate = useNavigate()

  useNavigateToCharactersWithHotkey()
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '95%'
      }}
    >
      <Box>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text size={theme.fontSizes.xl} color={theme.colors.indigo[5]}>
            Rick and Morty API
          </Text>
        </Link>
      </Box>

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<IconArrowUp size={16} />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </MediaQuery>

      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Box>
          <Box>
            <Group position="right">
              <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
                {isDark ? (
                  <IconSun size={16} color="white" />
                ) : (
                  <IconMoonStars size={16} color="black" />
                )}
              </ActionIcon>
              <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                <Button leftIcon={<IconClipboardText size={14} />} variant="light" color="green">
                  Leaderboard
                </Button>
              </Link>

              {isAuthenticated ? (
                <Button onClick={signOut} leftIcon={<IconLogout size={16} />}>
                  Sign out
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} leftIcon={<IconLogin size={16} />}>
                    Sign in
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    color="green"
                    leftIcon={<IconUserPlus size={16} />}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Group>
          </Box>
        </Box>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Menu>
          <Menu.Target>
            <Burger opened={false} size="sm" />
          </Menu.Target>

          <Menu.Dropdown style={{ minWidth: '150px' }}>
            <Menu.Item
              icon={isDark ? <IconSun size={14} /> : <IconMoonStars size={14} />}
              onClick={() => toggleColorScheme()}
            >
              {isDark ? 'Light mode' : 'Dark mode'}
            </Menu.Item>
            <Menu.Item component={Link} to="/leaderboard" icon={<IconClipboardText size={14} />}>
              Leaderboard
            </Menu.Item>
            <Menu.Item
              component={Link}
              to="/characters"
              icon={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" color="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Account</Menu.Label>
            {isAuthenticated ? (
              <Menu.Item onClick={signOut} color="red" icon={<IconLogout size={14} />}>
                Sign out
              </Menu.Item>
            ) : (
              <>
                <Menu.Item component={Link} to="/login" icon={<IconLogin size={14} />}>
                  Sign in
                </Menu.Item>
                <Menu.Item component={Link} to="/register" icon={<IconUserPlus size={14} />}>
                  Sign up
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </MediaQuery>
    </Box>
  )
}

export default HeaderContent
