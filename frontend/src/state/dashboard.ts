import { makeVar } from '@apollo/client'
import { FilterCharacterInput } from 'src/graphql/generated/generated'

/**
 * Reactive variable for storing the filter by which characters are filtered.
 */
export const filterVar = makeVar<FilterCharacterInput | undefined>(undefined)

/**
 * Reactive variable for storing whether the filter drawer is open.
 */
export const filterDrawerIsOpenVar = makeVar(false)
