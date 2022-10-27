import { Box, Button, Group } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { RegisterFormType } from 'src/types/forms'
import CustomError from '../common/CustomError'
import PasswordField from './PasswordField'
import TextField from './TextField'

type RegisterFormProps = {
  form: UseFormReturnType<RegisterFormType>
  handleOnSubmit: (values: RegisterFormType) => Promise<void>
  error?: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ form, handleOnSubmit, error }) => {
  return (
    <Box style={{ minWidth: 300, margin: 'auto' }}>
      {error && <CustomError description={error} />}
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))} data-cy="register-form">
        <TextField
          label="Email address"
          placeholder="Email"
          testid="email-input"
          autoFocus
          {...form.getInputProps('email')}
        />
        <TextField
          mt="md"
          label="Username"
          placeholder="Username"
          testid="username-input"
          {...form.getInputProps('username')}
        />
        <PasswordField
          mt="md"
          label="Password"
          placeholder="Password"
          testid="password-input"
          {...form.getInputProps('password')}
        />
        <PasswordField
          mt="md"
          label="Repeat password"
          placeholder="Repeat password"
          testid="repeatPassword-input"
          {...form.getInputProps('repeatPassword')}
        />

        <Group position="center" mt="xl">
          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default RegisterForm
