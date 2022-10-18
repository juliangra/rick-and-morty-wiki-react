import { Card, Image, Text, Group, Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { DefaultCharacterFragment } from 'src/graphql/generated/generated'

type CharacterCardProps = {
  character: DefaultCharacterFragment | null
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={character?.image} height={500} alt={`A picture of ${character?.name}`} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{character?.name}</Text>
      </Group>

      <Text size="sm" color="dimmed">
        Species: {character?.species}
      </Text>

      <Link to={`/characters/${character?.id}`}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          More information
        </Button>
      </Link>
    </Card>
  )
}

export default CharacterCard
