/// <reference types="cypress" />

export {};

Cypress.Commands.add('loginByUI', (username, password) => {
    cy.visit('/login');
    cy.get('.auth-page').contains('Sign in');

    cy.get('[data-testid="email"]')
        .type(username);

    cy.get('[data-testid="password"]')
        .type(password, {log: false});

    cy.get('[data-testid="login-button"]')
        .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    return cy.get('[data-testid="header-profile-link"]');
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginByUI(username: string, password: string): Chainable
        }
    }
}