import { Button, Card, createStyles, Group, Image, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { DefaultCharacterFragment } from 'src/graphql/generated/generated'
import StatusBadge from './StatusBadge'

type CharacterCardProps = {
  character: DefaultCharacterFragment | null
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const useStyles = createStyles((theme) => ({
    card: {
      transition: 'transform 150ms ease, box-shadow 150ms ease',
      '&:hover': {
        transform: 'scale(1.01)',
        boxShadow: theme.shadows.md
      }
    }
  }))

  const { classes } = useStyles()

  return (
    <Card shadow="sm" p="lg" radius="md" className={classes.card} withBorder>
      <Card.Section>
        <Link to={`/characters/${character?.id}`}>
          <Image
            src={character?.image}
            height={500}
            alt={`A picture of ${character?.name}`}
            tabIndex={-2}
          />
        </Link>
      </Card.Section>

      <StatusBadge status={character?.status || 'unknown'} />

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{character?.name}</Text>
      </Group>

      <Text size="sm" color="dimmed" data-cy={`species-text-${character?.id}`}>
        Species: {character?.species}
      </Text>

      <Link to={`/characters/${character?.id}`}>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          tabIndex={-1}
          data-cy={`more-info-${character?.id}`}>
          More information
        </Button>
      </Link>
    </Card>
  )
}

export default CharacterCard
