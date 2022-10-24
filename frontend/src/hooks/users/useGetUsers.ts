import { useState, useEffect } from 'react'
import { Order, useGetUsersQuery } from 'src/graphql/generated/generated'

/**
 * Handles logic related to fetching users, paginated and in a given order.
 *
 * @returns all neccessary objects and handlers for getting users.
 */
const useGetUsers = (page: number) => {
  const [orderBy, setOrderBy] = useState<Order>(Order.Desc)

  const { data, loading, error, refetch } = useGetUsersQuery({
    variables: { page, orderBy }
  })

  const handleOnChange = (value: string) => {
    const orderBy = value.toLowerCase() as Order
    setOrderBy(orderBy)
  }

  useEffect(() => {
    refetch({ page, orderBy })
  }, [page, orderBy])

  return { data, loading, error, handleOnChange, page, orderBy }
}

export default useGetUsers
