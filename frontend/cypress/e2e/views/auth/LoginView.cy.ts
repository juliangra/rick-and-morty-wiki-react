describe('Login', () => {
  const invalidUsername = 't'

  const randomAvailableUsername = (Math.random() + 1).toString(36).substring(6)
  const randomAvailableEmail = `${randomAvailableUsername}@example.com`

  const validEmail = 'john.doe@example.com'
  const validUsername = 'john'
  const validPassword = 'testPassword'
  const wrongPassword = 'notTheCorrectPassword'

  const INVALID_USERNAME_EMAIL_ERROR = 'Please enter your username or email address.'
  const NO_PASSWORD_ERROR = 'Please enter your password.'
  const NO_USER_FOUND_ERROR = 'No user found with given credentials!'

  it('Renders login page', () => {
    cy.visitHash('/login')
    cy.dataCy('login-form').children().should('have.length.at.least', 1)
  })

  it('Should not allow illegal email', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
    cy.inputWrapperError().should('contain', INVALID_USERNAME_EMAIL_ERROR)
  })

  it('Should not allow no password', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(invalidUsername)
    cy.get('form').submit()
    cy.inputWrapperError().should('contain', NO_PASSWORD_ERROR)
  })

  it('Should not allow wrong user credentials', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(randomAvailableEmail)
    cy.dataCy('password-input').type(wrongPassword)
    cy.get('form').submit()
    cy.dataCy('alert').should('contain', NO_USER_FOUND_ERROR)
  })

  it('Should allow login with username', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(validUsername)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })

  it('Should allow login with email address', () => {
    cy.visitHash('/login')
    cy.dataCy('identifier-input').type(validEmail)
    cy.dataCy('password-input').type(validPassword)
    cy.get('form').submit()
    cy.hash().should('equal', '#/')
  })
})
