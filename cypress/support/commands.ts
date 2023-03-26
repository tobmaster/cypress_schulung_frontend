/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
export {}

declare global {
    namespace Cypress {
        interface Chainable {
            loginByUI(username?: string, password?: string): Chainable

            // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}

Cypress.Commands.add("loginByUI", (username, password) => {
    cy.visit('/login');

    cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);

    cy.get('[data-testid="login-form"]')
        .should('contain', 'Sign in');

    cy.get('[data-testid="email"]')
        .type(username);
    cy.get('[data-testid="password"]')
        .type(password + "{enter}", {log: false});

    cy.get('[data-testid="username"]')
        .should('contain', 'Test User');
})