import { z } from 'zod'
import { LoginFormSchema, RegisterFormSchema } from '../schemas/forms'

export type RegisterForm = z.infer<typeof RegisterFormSchema>
export type LoginForm = z.infer<typeof LoginFormSchema>
