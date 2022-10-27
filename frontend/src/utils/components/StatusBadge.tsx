import { IconHeart, IconQuestionMark, IconSkull } from '@tabler/icons'

/**
 * Gets the icon and color to describe a character, based on the status.
 * @param status is the status of the character.
 * @returns the icon and color to describe the character.
 */
export const getIconFromStatus = (status: string) => {
  let icon
  let color

  switch (status) {
    case 'Alive':
      icon = <IconHeart size={16} />
      color = 'green'
      break
    case 'Dead':
      icon = <IconSkull size={16} />
      color = 'red'
      break
    default:
      icon = <IconQuestionMark size={16} />
      color = 'gray'
      break
  }

  return { icon, color }
}
