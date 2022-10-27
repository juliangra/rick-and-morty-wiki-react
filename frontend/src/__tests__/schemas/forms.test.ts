import { RegisterFormSchema } from 'src/schemas/forms'
import { RegisterFormType } from 'src/types/forms'

/**
 * Test the RegisterFormSchema.
 * This validation is very similar to the LoginFormSchema.
 * @param data is the data to test.
 *
 * @returns a boolean indicating whether the data is valid.
 */
const isValid = (data: RegisterFormType) => {
  try {
    RegisterFormSchema.parse(data)
  } catch (error) {
    if (error) {
      return false
    }
  }

  return true
}

describe('Forms', () => {
  const invalidUsername = 'a'
  const validUsername = 'test'
  const invalidEmail = 'invalidEmail'
  const validEmail = 'test.test@example.com'
  const invalidPassword = '12345'
  const validPassword = '123456'

  it('only allows valid email', () => {
    const actual: RegisterFormType = {
      email: invalidEmail,
      username: 'test',
      password: 'password',
      repeatPassword: 'password'
    }

    expect(isValid(actual)).toBe(false)
    expect(isValid({ ...actual, email: validEmail })).toBe(true)
  })

  it('only allows valid username', () => {
    const actual: RegisterFormType = {
      email: validEmail,
      username: invalidUsername,
      password: 'password',
      repeatPassword: 'password'
    }

    expect(isValid(actual)).toBe(false)
    expect(isValid({ ...actual, username: validUsername })).toBe(true)
  })

  it('only allows valid password', () => {
    const invalid: RegisterFormType = {
      email: validEmail,
      username: validUsername,
      password: invalidPassword,
      repeatPassword: invalidPassword
    }

    const valid: RegisterFormType = {
      email: validEmail,
      username: validUsername,
      password: validPassword,
      repeatPassword: validPassword
    }

    expect(isValid(invalid)).toBe(false)
    expect(isValid(valid)).toBe(true)
  })
})
