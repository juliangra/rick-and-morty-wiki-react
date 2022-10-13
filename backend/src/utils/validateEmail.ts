/**
 * Validates an email address using a regular expression.
 *
 * Inspired by https://stackoverflow.com/a/46181.
 *
 * @param email is the provided email.
 * @returns a boolean indicating whether the email is valid.
 */
const validateEmail = (email: string) =>
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

export default validateEmail
