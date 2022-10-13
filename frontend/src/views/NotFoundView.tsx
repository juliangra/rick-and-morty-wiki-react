import { Text } from '@mantine/core'
import View from './View'

const NotFoundView = () => {
  // TODO: Style this view
  return (
    <View>
      <div>
        <Text size="xl" data-cy="heading" data-testid="heading">
          404 - Page Not Found
        </Text>
      </div>
    </View>
  )
}

export default NotFoundView
