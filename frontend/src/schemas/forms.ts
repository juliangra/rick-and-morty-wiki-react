import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: 'Invalid e-mail.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' })
})
