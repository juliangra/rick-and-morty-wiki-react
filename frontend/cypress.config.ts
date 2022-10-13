import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: false,
    supportFile: './cypress/support/e2e.ts',
    retries: {
      runMode: 3,
      openMode: 0
    }
  }
})
