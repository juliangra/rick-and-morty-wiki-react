import { z } from 'zod'
import { UserSchema } from '../schemas/forms'

export type User = z.infer<typeof UserSchema>
