import { RatingSchema } from 'src/schemas/rating'
import { z } from 'zod'

export type Rating = z.infer<typeof RatingSchema>
