import { Center, Loader } from '@mantine/core'

const CustomLoading = () => {
  return (
    <Center style={{ minHeight: '100vh', width: '100vw' }}>
      <Loader color={'indigo'} data-testid="loading" data-cy="loading" />
    </Center>
  )
}

export default CustomLoading
