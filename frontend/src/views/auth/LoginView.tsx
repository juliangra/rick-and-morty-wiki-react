import { Center } from '@mantine/core'
import CustomLoading from 'src/components/common/CustomLoading'
import LoginForm from 'src/components/forms/LoginForm'
import useLoginForm from 'src/hooks/forms/useLoginForm'
import View from '../View'

const LoginView = () => {
  const { form, handleOnSubmit, error, loading } = useLoginForm()

  if (loading) {
    return <CustomLoading />
  }

  return (
    <View>
      <Center style={{ height: '100%' }}>
        <LoginForm form={form} handleOnSubmit={handleOnSubmit} error={error} />
      </Center>
    </View>
  )
}

export default LoginView
