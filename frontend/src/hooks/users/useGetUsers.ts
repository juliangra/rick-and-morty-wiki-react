import { useReactiveVar } from '@apollo/client'
import { Order, useGetUsersQuery } from 'src/graphql/generated/generated'
import { orderByVar } from 'src/state/leaderboard'

/**
 * Handles logic related to fetching users, paginated and in a given order.
 *
 * @returns all neccessary objects and handlers for getting users.
 */
const useGetUsers = (page: number) => {
  const orderBy = useReactiveVar(orderByVar)

  const { data, loading, error } = useGetUsersQuery({
    variables: { page, orderBy }
  })

  const handleOnChange = (value: string) => {
    const orderBy = value.toLowerCase() as Order
    orderByVar(orderBy)
  }

  return { data, loading, error, handleOnChange, page }
}

export default useGetUsers
