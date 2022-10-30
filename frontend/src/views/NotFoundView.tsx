import { Center, Text } from '@mantine/core'
import View from './View'

const NotFoundView = () => {
  return (
    <View>
      <Center style={{ height: '100vh' }}>
        <Text size="xl" data-cy="heading" data-testid="heading">
          404 - Page Not Found
        </Text>
      </Center>
    </View>
  )
}

export default NotFoundView
