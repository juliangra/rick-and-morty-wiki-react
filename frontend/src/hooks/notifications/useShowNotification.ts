import { showNotification } from '@mantine/notifications'

interface ShowNotificationProps {
  title?: string
  message: string
}

/**
 * Displays a success notification with custom title and message
 *
 * @param title is the title of the notification
 * @param message is the main body of the notification
 */
const useShowNotification = ({ title, message }: ShowNotificationProps) => {
  showNotification({
    title: title ?? 'Info',
    color: 'teal',
    message,
    disallowClose: true
  })
}

export default useShowNotification
