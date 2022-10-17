import { z } from 'zod'
import { LoginFormSchema, RegisterFormSchema } from '../schemas/forms'

export type RegisterFormType = z.infer<typeof RegisterFormSchema>
export type LoginFormType = z.infer<typeof LoginFormSchema>
