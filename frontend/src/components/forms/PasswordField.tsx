import { PasswordInput, PasswordInputProps } from '@mantine/core'

interface PasswordFieldProps extends PasswordInputProps {
  // This must be lowercase in order for the snapshot tests to include it
  testid?: string
}

const PasswordField: React.FC<PasswordFieldProps> = ({ testid, ...props }) => {
  return <PasswordInput data-testid={testid} data-cy={testid} {...props} />
}

export default PasswordField
