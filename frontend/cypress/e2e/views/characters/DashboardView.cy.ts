describe('DashboardView', () => {
  it('gets data from API', () => {
    cy.visitHash('/characters')
    cy.dataCy('characters-container').children().should('have.length.at.least', 1)
  })
})
