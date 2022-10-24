import { Prisma } from '@prisma/client'

/**
 * A strict type wrapper for filtering characters based on the allowed keys.
 *
 * @example See `addFilterToQuery` in `backend/src/utils/resolvers.ts`.
 */
export type FilterQueryKey = keyof Pick<
  Prisma.CharacterWhereInput,
  'name' | 'status' | 'species' | 'type' | 'gender'
>

export type OperationQueryKey = keyof Prisma.StringFilter
