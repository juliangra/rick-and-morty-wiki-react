import { context } from '../context'
import { AuthResponse } from '../types/auth'
import validateEmail from '../utils/validateEmail'

/**
 * Validates if email is valid and whether it is already in use.
 *
 * @param email is the provided email address from user
 * @returns true if email is valid and not in use, false otherwise
 */
export const isValidEmail = async (email: string): Promise<AuthResponse> => {
  if (!validateEmail(email)) return { ok: false, error: 'Invalid email.' }

  const emailExists = await context.prisma.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  })

  if (emailExists) {
    return { ok: false, error: 'Email is already in use.' }
  }

  return { ok: true }
}
