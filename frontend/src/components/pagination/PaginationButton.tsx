import { ActionIcon } from '@mantine/core'
import React from 'react'

interface PaginationButtonProps {
  content: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ content, disabled, onClick }) => {
  return (
    <ActionIcon
      variant="filled"
      style={{ height: 60, width: 60 }}
      size="xl"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </ActionIcon>
  )
}

export default PaginationButton
