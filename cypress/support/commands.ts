// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'loginByUI',
  (username = 'testuser@example.com', password = 'password') => {
    cy.visit('/login');
    cy.url().should('contain', '/login');
    cy.get('.auth-page').contains('Sign in');
    cy.get('[data-testid="email"]').as('emailinput');
    cy.get('@emailinput').type(username);
    cy.get('[data-testid="password"]').type(password);
    return cy.get('[data-testid="login-button"]').click();
  }
);
