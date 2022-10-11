import {
  Button,
  Grid,
  Group,
  Switch,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons'

const HeaderContent = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const isDark = colorScheme === 'dark'

  return (
    <Grid justify="center" align="center">
      <Grid.Col span={6}>
        <Text size={theme.fontSizes.xl} color={theme.colors.indigo[6]}>
          Rick and Morty API
        </Text>
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="right">
          <Switch
            size="lg"
            color={'dark'}
            offLabel={<IconMoonStars size={20} stroke={2.5} color={theme.colors.indigo[9]} />}
            onLabel={<IconSun size={20} stroke={2.5} color={theme.colors.yellow[4]} />}
            onChange={() => toggleColorScheme()}
            checked={isDark}
          />
          <Button
            styles={() => ({
              root: {
                colorScheme
              }
            })}
          >
            Login
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  )
}

export default HeaderContent
