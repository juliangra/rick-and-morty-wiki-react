import { Box, Group, Button } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { LoginFormType } from 'src/types/forms'
import CustomError from '../common/CustomError'
import PasswordField from './PasswordField'
import TextField from './TextField'

type LoginFormProps = {
  form: UseFormReturnType<LoginFormType>
  handleOnSubmit: (values: LoginFormType) => Promise<void>
  error?: string
}

const LoginForm: React.FC<LoginFormProps> = ({ form, handleOnSubmit, error }) => {
  return (
    <Box style={{ minWidth: 300, margin: 'auto' }}>
      {error && <CustomError description={error} />}
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))} data-cy="login-form">
        <TextField
          label="Username / Email address"
          placeholder="Username / Email"
          testid="identifier-input"
          {...form.getInputProps('identifier')}
        />
        <PasswordField
          mt="md"
          label="Password"
          placeholder="Password"
          testid="password-input"
          {...form.getInputProps('password')}
        />

        <Group position="center" mt="xl">
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default LoginForm
