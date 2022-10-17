import { TextInput, TextInputProps } from '@mantine/core'

interface TextFieldProps extends TextInputProps {
  // This must be lowercase in order for the snapshot tests to include it
  testid?: string
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const { testid } = props
  return <TextInput data-cy={testid} data-testid={testid} {...props} />
}

export default TextField
