import { Box, Center, Grid, Pagination, Select } from '@mantine/core'
import { IconSortAscending, IconSortDescending } from '@tabler/icons'
import { useState } from 'react'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import UserCard from 'src/components/leaderboard/UserCard'
import { CURSOR_OFFSET } from 'src/constants'
import { Order } from 'src/graphql/generated/generated'
import useGetUsers from 'src/hooks/users/useGetUsers'
import capitalize from 'src/utils/capitalize'
import View from './View'

const LeaderboardView = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error, handleOnChange, orderBy } = useGetUsers(page)

  const numberOfUsers = data?.users.count || 0
  const numberOfPages = Math.ceil(numberOfUsers / CURSOR_OFFSET)
  const availableOrders = Object.keys(Order)
  const users = data?.users.users

  return (
    <View>
      <Box>
        {error && <CustomError />}
        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={availableOrders}
          icon={orderBy === Order.Asc ? <IconSortAscending /> : <IconSortDescending />}
          placeholder={capitalize(Order.Desc)}
          label="Order By"
          onChange={handleOnChange}
        />

        <Grid>
          {loading ? (
            <CustomLoading />
          ) : (
            users?.map((user) => (
              <Grid.Col span={4} key={user.id}>
                <UserCard user={user}></UserCard>
              </Grid.Col>
            ))
          )}
        </Grid>
        <Center style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination page={page} onChange={setPage} total={numberOfPages} size="xl" />
        </Center>
      </Box>
    </View>
  )
}

export default LeaderboardView
