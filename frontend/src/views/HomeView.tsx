import { Box, Button, Center, Divider, Text, Title } from '@mantine/core'
import { IconLogin, IconSearch, IconUserPlus } from '@tabler/icons'
import { Link } from 'react-router-dom'
import useIsAuthenticated from 'src/hooks/auth/useAuthentication'
import View from './View'

const HomeView = () => {
  const { isAuthenticated } = useIsAuthenticated()

  return (
    <View>
      <Center style={{ height: '80vh', flexDirection: 'column', textAlign: 'center' }}>
        <Title>
          Welcome to the{' '}
          <Text component="span" color="blue">
            Rick and Morty
          </Text>{' '}
          wiki!
        </Title>
        <Text color="dimmed">Browse, filter and rate your favourite Rick and Morty characters</Text>
        <Box mt={10}>
          <Link to="/characters">
            <Button leftIcon={<IconSearch size={16} />} tabIndex={-1} fullWidth>
              Browse characters
            </Button>
          </Link>
          {!isAuthenticated && (
            <>
              <Divider my="xs" label="or" labelPosition="center" />
              <Box style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
                <Link to="/register">
                  <Button color="green" leftIcon={<IconUserPlus size={16} />} tabIndex={-1}>
                    Sign up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button leftIcon={<IconLogin size={16} />} tabIndex={-1}>
                    Sign in
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Center>
    </View>
  )
}

export default HomeView
