import { Alert, Center } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons'

type CustomErrorProps = {
  title?: string
  description?: string
}

const CustomError: React.FC<CustomErrorProps> = ({ title, description }) => {
  return (
    <Center style={{ minHeight: '100vh' }}>
      <Alert icon={<IconAlertCircle size={16} />} title={title || 'Oops!'} color="red">
        {description || 'An unexpected error occurred!'}
      </Alert>
    </Center>
  )
}

export default CustomError
