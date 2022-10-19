import { useForm, zodResolver } from '@mantine/form'
import { useContext, useState } from 'react'
import { FilterContext } from 'src/context/FilterContext'
import { FilterFormSchema } from 'src/schemas/forms'
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
  const { setOpen, setFilters } = useContext(FilterContext)
  const [formValues] = useState<FilterFormType>(initialValues)

  const form = useForm({
    validate: zodResolver(FilterFormSchema),
    initialValues: formValues
  })

  const handleOnSubmit = (values?: FilterFormType) => {
    if (!values) form.reset()

    setFilters(values || initialValues)
    setOpen(false)
  }

  return { form, handleOnSubmit }
}

export default useFilterForm
