import { Box, Button, Center, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import { useCreateUserMutation } from 'src/graphql/generated/generated'
import useAuthentication from 'src/hooks/auth/useAuthentication'
import useRedirectIfAuthenticated from 'src/hooks/auth/useRedirectIfAuthenticated'
import { RegisterFormSchema } from 'src/schemas/forms'
import { RegisterForm } from 'src/types/forms'
import View from '../View'

const RegisterView = () => {
  useRedirectIfAuthenticated()

  const navigate = useNavigate()
  const { signIn } = useAuthentication()
  const [error, setError] = useState<string | undefined>(undefined)

  const [formValues] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
  })

  const form = useForm({
    validate: zodResolver(RegisterFormSchema),
    initialValues: formValues
  })

  const [register, { loading }] = useCreateUserMutation({
    variables: {
      ...formValues
    }
  })

  const handleSignUp = async (values: RegisterForm) => {
    const { data } = await register({
      variables: {
        ...values
      }
    })

    const { error, token } = data?.createUser || {}

    if (error) {
      setError(error)
      return
    }

    if (token) {
      signIn(token)
      navigate('/')
    }
  }

  if (loading) {
    return <CustomLoading />
  }

  return (
    <View>
      <Center style={{ height: '100%' }}>
        <Box style={{ minWidth: 300, margin: 'auto' }}>
          {error && <CustomError description={error} />}
          <form
            onSubmit={form.onSubmit((values) => {
              handleSignUp(values)
            })}
            data-cy="register-form">
            <TextInput
              label="Email address"
              placeholder="Email"
              data-testid="email-input"
              data-cy="email-input"
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Username"
              placeholder="Username"
              data-testid="username-input"
              data-cy="username-input"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Password"
              data-testid="password-input"
              data-cy="password-input"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt="md"
              label="Repeat password"
              placeholder="Repeat password"
              data-testid="repeatPassword-input"
              data-cy="repeatPassword-input"
              {...form.getInputProps('repeatPassword')}
            />

            <Group position="center" mt="xl">
              <Button type="submit" fullWidth>
                Sign Up
              </Button>
            </Group>
          </form>
        </Box>
      </Center>
    </View>
  )
}

export default RegisterView
