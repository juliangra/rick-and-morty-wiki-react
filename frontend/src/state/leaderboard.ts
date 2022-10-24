import { makeVar } from '@apollo/client'
import { Order } from 'src/graphql/generated/generated'

/**
 * Reactive variable for storing the order by which users are sorted.
 */
export const orderByVar = makeVar(Order.Desc)
