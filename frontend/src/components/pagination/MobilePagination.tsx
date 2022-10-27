import { Group, Text } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'
import React from 'react'
import PaginationButton from './PaginationButton'

interface MobilePaginationProps {
  page: number
  onChange: (page: number) => void
  total: number
}

/**
 * Renders the pagination buttons for mobile devices.
 *
 * This is necessary, as Mantine's default pagination component is not fullt responsive
 */
const MobilePagination: React.FC<MobilePaginationProps> = ({ page, onChange, total, ...props }) => {
  return (
    <Group {...props}>
      <PaginationButton
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        content={<IconChevronLeft size={16} />}
      />
      <PaginationButton content={<Text>{page}</Text>} />

      <PaginationButton
        disabled={page === total}
        onClick={() => onChange(page + 1)}
        content={<IconChevronRight size={16} />}
      />
    </Group>
  )
}

export default MobilePagination
