import { Text } from '@mantine/core'
import React from 'react'

interface LabelProps {
  label: string
  value?: string
}

const Label: React.FC<LabelProps> = ({ label, value }) => {
  return (
    <Text size="md">
      {label}:{' '}
      <Text component="span" weight="bold">
        {value}
      </Text>
    </Text>
  )
}

export default Label
