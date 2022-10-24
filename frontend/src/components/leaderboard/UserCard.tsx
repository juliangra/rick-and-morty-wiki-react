import { Text, Card } from '@mantine/core'
import React from 'react'
import { DefaultUserFragment } from 'src/graphql/generated/generated'

type UserCardProps = {
  user: DefaultUserFragment | null
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card withBorder p="xl" radius="md" mt={10}>
      <div>
        <div>
          <Text size="xl">{user?.username}</Text>
          <div>
            <Text mt={15}>Number of ratings</Text>
            <Text size="sm" color="dimmed">
              {user?.ratings?.length}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default UserCard
