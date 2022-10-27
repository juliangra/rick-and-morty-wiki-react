import { makeVar } from '@apollo/client'

/**
 * Reactive variable for storing whether the rating modal is open.
 */
export const ratingModalIsOpenVar = makeVar(false)
