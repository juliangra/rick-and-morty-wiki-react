import { Center, Loader } from '@mantine/core'

const CustomLoading = () => {
  return (
    <Center style={{ minHeight: '100vh' }}>
      <Loader color={'indigo'} data-testid="loading" />
    </Center>
  )
}

export default CustomLoading
