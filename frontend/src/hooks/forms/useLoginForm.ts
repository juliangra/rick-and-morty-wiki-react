import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthenticateUserMutation } from 'src/graphql/generated/generated'
import { LoginFormSchema } from 'src/schemas/forms'
import { LoginFormType } from 'src/types/forms'
import useAuthentication from '../auth/useAuthentication'
import useRedirectIfAuthenticated from '../auth/useRedirectIfAuthenticated'

/**
 * Handles the logic for the login form.
 *
 * @returns all neccessary objects and handlers for interacting with the form.
 */
const useLoginForm = () => {
  useRedirectIfAuthenticated()

  const navigate = useNavigate()
  const { signIn } = useAuthentication()
  const [error, setError] = useState<string | undefined>(undefined)

  const [formValues] = useState<LoginFormType>({
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

  const handleOnSubmit = async (values: LoginFormType) => {
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

  return { form, handleOnSubmit, loading, error }
}

export default useLoginForm
