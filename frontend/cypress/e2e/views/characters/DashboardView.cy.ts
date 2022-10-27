describe('DashboardView', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })
  it('gets data from API', () => {
    cy.visitHash('/characters')
    cy.dataCy('characters-container').children().should('have.length.at.least', 1)
  })

  it('Shows more information when clicking the more information button', () => {
    cy.visitHash('/characters')
    cy.dataCy('more-info-1').click()
    cy.hash().should('equal', '#/characters/1')
  })

  it('Filters character by name when typing in the search bar', () => {
    cy.visitHash('/characters')
    cy.dataCy('search-bar').type('Rick')
    cy.dataCy('characters-container').children().should('have.length.at.least', 1)
    cy.dataCy('characters-container').children().children().should('include.text', 'Rick')
  })

  it('Filters character by filter button', () => {
    cy.visitHash('/characters')
    cy.dataCy('filter-button').click()
    cy.dataCy('species-select').type('Human')
    cy.dataCy('characters-container').children().children().should('include.text', 'Species: Human')
  })
})
