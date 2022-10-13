import { Alert, Center } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'

type CustomErrorProps = {
  title?: string
  description?: string
  overlay?: boolean
}

const CustomError: React.FC<CustomErrorProps> = ({ title, description, overlay = false }) => {
  return (
    <Center style={{ minHeight: overlay ? '100vh' : 'auto' }}>
      <Alert
        icon={<IconAlertCircle size={16} />}
        title={title ?? ''}
        color="red"
        style={{ width: '100%' }}
        data-cy="alert"
      >
        {description || 'An unexpected error occurred!'}
      </Alert>
    </Center>
  )
}

export default CustomError
