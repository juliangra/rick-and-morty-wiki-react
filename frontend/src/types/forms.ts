import { z } from 'zod'
import { FilterFormSchema, LoginFormSchema, RegisterFormSchema } from '../schemas/forms'

export type RegisterFormType = z.infer<typeof RegisterFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
export type FilterFormType = z.infer<typeof FilterFormSchema>

export type SelectOption = {
  label: string
  value: string
}
