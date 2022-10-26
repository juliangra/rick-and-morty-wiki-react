import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateUserMutation } from 'src/graphql/generated/generated'
import { RegisterFormSchema } from 'src/schemas/forms'
import { RegisterFormType } from 'src/types/forms'
import useAuthentication from '../auth/useAuthentication'
import useRedirectIfAuthenticated from '../auth/useRedirectIfAuthenticated'

/**
 * Handles the logic for the register form.
 *
 * @returns all neccessary objects and handlers for interacting with the form.
 */
const useRegisterForm = () => {
  useRedirectIfAuthenticated()

  const navigate = useNavigate()
  const { signIn } = useAuthentication()
  const [error, setError] = useState<string | undefined>(undefined)

  const [formValues] = useState<RegisterFormType>({
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

  const handleOnSubmit = async (values: RegisterFormType) => {
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

  return { form, handleOnSubmit, loading, error }
}

export default useRegisterForm
