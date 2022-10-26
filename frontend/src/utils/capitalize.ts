/**
 * @returns a capitalized version of the given string.
 */
const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default capitalize
