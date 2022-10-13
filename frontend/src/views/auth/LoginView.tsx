import { Box, Button, Center, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import { useAuthenticateUserMutation } from 'src/graphql/generated/generated'
import useAuthentication from 'src/hooks/auth/useAuthentication'
import useRedirectIfAuthenticated from 'src/hooks/auth/useRedirectIfAuthenticated'
import { LoginFormSchema } from 'src/schemas/forms'
import { LoginForm } from 'src/types/forms'
import View from '../View'

const LoginView = () => {
  useRedirectIfAuthenticated()

  const navigate = useNavigate()
  const { signIn } = useAuthentication()
  const [error, setError] = useState<string | undefined>(undefined)

  const [formValues] = useState({
    identifier: '',
    password: ''
  })

  const form = useForm({
    validate: zodResolver(LoginFormSchema),
    initialValues: formValues
  })

  const [login, { loading }] = useAuthenticateUserMutation({
    variables: {
      ...formValues
    }
  })

  const handleSignIn = async (values: LoginForm) => {
    const { data } = await login({
      variables: {
        ...values
      }
    })

    const { error, token } = data?.authenticateUser || {}
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
          <form onSubmit={form.onSubmit((values) => handleSignIn(values))} data-cy="login-form">
            <TextInput
              label="Username / Email address"
              placeholder="Username / Email"
              data-testid="identifier-input"
              data-cy="identifier-input"
              {...form.getInputProps('identifier')}
            />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Password"
              data-testid="password-input"
              data-cy="password-input"
              {...form.getInputProps('password')}
            />

            <Group position="center" mt="xl">
              <Button type="submit" fullWidth>
                Sign In
              </Button>
            </Group>
          </form>
        </Box>
      </Center>
    </View>
  )
}

export default LoginView
