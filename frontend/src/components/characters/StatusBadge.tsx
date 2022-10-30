import { Badge, Box } from '@mantine/core'
import { getIconFromStatus } from 'src/utils/components/StatusBadge'

interface StatusBadgeProps {
  status: string
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { color, icon } = getIconFromStatus(status)

  return (
    <Badge
      variant="filled"
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px'
      }}
      leftSection={<Box mt={5}>{icon}</Box>}
      color={color}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
