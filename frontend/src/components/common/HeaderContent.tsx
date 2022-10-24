import {
  Button,
  Grid,
  Group,
  Switch,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { IconSun, IconMoonStars, IconUserPlus, IconLogin, IconLogout } from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'
import useIsAuthenticated from 'src/hooks/auth/useAuthentication'

const HeaderContent = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const isDark = colorScheme === 'dark'

  const { isAuthenticated, signOut } = useIsAuthenticated()
  const navigate = useNavigate()

  return (
    <Grid justify="center" align="center">
      <Grid.Col span={6}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text size={theme.fontSizes.xl} color={theme.colors.indigo[5]}>
            Rick and Morty API
          </Text>
        </Link>
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="right">
          <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
            <Text size={theme.fontSizes.md} color={theme.colors.indigo[5]}>
              Leaderboard
            </Text>
          </Link>
          <Switch
            size="lg"
            color={'dark'}
            offLabel={<IconMoonStars size={20} stroke={2.5} color={theme.colors.indigo[9]} />}
            onLabel={<IconSun size={20} stroke={2.5} color={theme.colors.yellow[4]} />}
            onChange={() => toggleColorScheme()}
            checked={isDark}
          />

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
      </Grid.Col>
    </Grid>
  )
}

export default HeaderContent
