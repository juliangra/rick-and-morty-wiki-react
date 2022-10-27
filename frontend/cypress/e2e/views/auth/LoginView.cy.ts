describe('LoginView', () => {
  const invalidUsername = 't'

  const randomAvailableUsername = (Math.random() + 1).toString(36).substring(6)
  const randomAvailableEmail = `${randomAvailableUsername}@example.com`

  const validEmail = 'test@example.com'
  const validUsername = 'test'
  const validPassword = 'password'
  const wrongPassword = 'notTheCorrectPassword'

  const INVALID_IDENTIFIER_ERROR = 'Please enter your username or email address.'
  const NO_PASSWORD_ERROR = 'Please enter your password.'
  const NO_USER_FOUND_ERROR = 'No user found with given credentials!'

  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('renders login page', () => {
    cy.visitHash('/login')
    cy.dataCy('login-form').children().should('have.length.at.least', 1)
  })

  it('should not allow illegal email', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
    cy.inputWrapperError().should('contain', INVALID_IDENTIFIER_ERROR)
  })

  it('should not allow no password', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
    cy.inputWrapperError().should('contain', NO_PASSWORD_ERROR)
  })

  it('should not allow wrong user credentials', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(randomAvailableEmail)
    cy.dataCy('password-input').type(wrongPassword)
    cy.get('form').submit()
    cy.dataCy('alert').should('contain', NO_USER_FOUND_ERROR)
  })

  it('should allow login with username', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(validUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })

  it('should allow login with email address', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(validEmail)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })
})
