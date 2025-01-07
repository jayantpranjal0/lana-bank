// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// eslint-disable-next-line import/no-unassigned-import
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(() => {
  cy.viewport(1920, 1080)
  cy.session(
    "loginSession",
    () => {
      cy.visit(Cypress.env("MAGIC_LINK"), { timeout: 60000 })
      cy.contains("Dashboard", { timeout: 60000 })
    },
    { cacheAcrossSpecs: true },
  )
})
