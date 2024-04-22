export { };

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


declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string, expectedUsername: string): Chainable
            loginRole(role: string): Chainable
            /* drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
             dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
             visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>*/
        }
    }
}

Cypress.Commands.add('login', (email: string, password: string, expectedUsername: string) => {
    cy.visit("/");
    cy.contains("Sign in")
        .click();

    cy.url().should("include", "/login");

    cy.get('[data-testid="email"]')
        .type(email);
    cy.get('[data-testid="password"]')
        .type(password);

    cy.get('[data-testid="login-button"]').as('loginButton');

    cy.get('@loginButton')
        .click();

    //cy.wait(5000);
    cy.url({ timeout: 10000 })
        .should('equal', `${Cypress.config().baseUrl}/`);

    cy.get(`[data-testid="username"]`)
        .should('contain', expectedUsername);

    return cy.get(`[data-testid="username"]`)

});

const roles = {
    admin: {
        email: "admin@adesso.de",
        password: "supergeheim",
        expectedUsername: "Armin Admin"
    },
    normalUser: {
        email: "testuser@example.com",
        password: "password",

        expectedUsername: "Tobi Tester"
    },
    teilnehmer: {
        email: "melanie@test.de",
        password: "Passwort123",
        expectedUsername: "Mel_t"
    }
}

Cypress.Commands.add('loginRole', (role: string) => {
    cy.login(roles[role].email, roles[role].password, roles[role].expectedUsername);
});
