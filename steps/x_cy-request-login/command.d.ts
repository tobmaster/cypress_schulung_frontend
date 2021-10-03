/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login test user fast
     * cy.loginTestuser()
     */
    loginTestUser(): void;
  }
}
