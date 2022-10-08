import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    screenshotOnRunFailure: false,
    supportFile: './cypress/support/e2e.ts',
    retries: {
      runMode: 3,
      openMode: 0
    }
  }
})
