import { useReactiveVar } from '@apollo/client'
import {
  Avatar,
  Badge,
  Box,
  Center,
  Group,
  MediaQuery,
  Pagination,
  ScrollArea,
  Select,
  Table,
  Text
} from '@mantine/core'
import { IconSortAscending, IconSortDescending } from '@tabler/icons'
import { useState } from 'react'
import CustomError from 'src/components/common/CustomError'
import CustomLoading from 'src/components/common/CustomLoading'
import MobilePagination from 'src/components/pagination/MobilePagination'
import { Order } from 'src/graphql/generated/generated'
import useGetUsers from 'src/hooks/users/useGetUsers'
import { orderByVar } from 'src/state/leaderboard'
import capitalize from 'src/utils/capitalize'
import { formatRatingStats, getTimeSince, userHasRatings } from 'src/utils/views/LeaderboardView'
import View from './View'

const LeaderboardView = () => {
  const [page, setPage] = useState(1)
  const orderBy = useReactiveVar(orderByVar)

  const { data, loading, error, handleOnChange } = useGetUsers(page)

  const numberOfPages = data?.users.info.pages || 0
  const availableOrders = Object.keys(Order)
  const users = data?.users.results

  return (
    <View>
      <Box>
        {loading && <CustomLoading />}
        {error && <CustomError />}
        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={availableOrders}
          icon={orderBy === Order.Asc ? <IconSortAscending /> : <IconSortDescending />}
          placeholder={capitalize(Order.Desc)}
          label="Order By"
          onChange={handleOnChange}
        />

        <ScrollArea>
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th>Users</th>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <th>Created</th>
                </MediaQuery>

                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Group>
                      <Avatar size={40} radius={40} />
                      <>
                        <Text size="sm" weight={500}>
                          {user.username}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {user.email}
                        </Text>
                      </>
                    </Group>
                  </td>

                  <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <td>{getTimeSince(user.createdAt)}</td>
                  </MediaQuery>
                  <td>
                    {user.ratings && userHasRatings(user.ratings) ? (
                      <Badge fullWidth>{formatRatingStats(user.ratings)}</Badge>
                    ) : (
                      <Badge color="gray" fullWidth>
                        No ratings yet
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
        <Center style={{ marginTop: 24, marginBottom: 24 }}>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Pagination page={page} onChange={setPage} total={numberOfPages} size="xl" />
          </MediaQuery>

          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <MobilePagination page={page} onChange={setPage} total={numberOfPages} />
          </MediaQuery>
        </Center>
      </Box>
    </View>
  )
}

export default LeaderboardView
