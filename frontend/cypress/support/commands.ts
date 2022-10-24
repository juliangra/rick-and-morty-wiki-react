/// <reference types="cypress" />

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy="${value}"]`)
})

Cypress.Commands.add('visitHash', (value) => {
  return cy.visit(`/#${value}`)
})

Cypress.Commands.add('inputWrapperError', () => {
  return cy.get('.mantine-InputWrapper-error')
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by `data-cy` attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<unknown>

      /**
       * A wrapper over cy.visit() that prepends the hash to the URL.
       * @example cy.visitHash('/characters/1') => cy.visit('/#/characters/1')
       */
      visitHash(value: string): Chainable<unknown>

      /**
       * A wrapper over cy.get() that selects the error message of an input.
       * This is generated client side by Mantine when submitting a form.
       */
      inputWrapperError(): Chainable<unknown>
    }
  }
}

export {}
