describe('CharacterView', () => {
  it('redirects if ID is invalid', () => {
    cy.visitHash('/characters/invalid-id')
    cy.url().should('include', '404')
  })

  it('renders if ID is valid', () => {
    cy.visitHash('/characters/1')
    cy.url().should('include', 'characters/1')
  })
})
