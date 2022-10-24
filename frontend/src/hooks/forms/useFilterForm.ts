import { useForm, zodResolver } from '@mantine/form'
import { useState } from 'react'
import { FilterFormSchema } from 'src/schemas/forms'
import { filterDrawerIsOpenVar, filterVar } from 'src/state/dashboard'
import { FilterFormType } from 'src/types/forms'

const initialValues: FilterFormType = {
  species: null,
  gender: null,
  status: null
}

/**
 * Handles logic related to filtering characters.
 *
 * @param props is the handlers for toggling the form, and setting the filters.
 * @returns all neccessary objects and handlers for interacting with the form.
 */
const useFilterForm = () => {
  const [formValues] = useState<FilterFormType>(initialValues)

  const form = useForm({
    validate: zodResolver(FilterFormSchema),
    initialValues: formValues
  })

  const handleOnSubmit = (values?: FilterFormType) => {
    if (!values) form.reset()

    filterVar(values || initialValues)
    filterDrawerIsOpenVar(false)
  }

  return { form, handleOnSubmit }
}

export default useFilterForm
