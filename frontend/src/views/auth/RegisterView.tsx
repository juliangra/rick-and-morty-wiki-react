import { Center } from '@mantine/core'
import CustomLoading from 'src/components/common/CustomLoading'
import RegisterForm from 'src/components/forms/RegisterForm'
import useRegisterForm from 'src/hooks/forms/useRegisterForm'
import View from '../View'

const RegisterView = () => {
  const { form, handleOnSubmit, error, loading } = useRegisterForm()

  if (loading) {
    return <CustomLoading />
  }

  return (
    <View>
      <Center style={{ height: '100%' }}>
        <RegisterForm form={form} handleOnSubmit={handleOnSubmit} error={error} />
      </Center>
    </View>
  )
}

export default RegisterView
