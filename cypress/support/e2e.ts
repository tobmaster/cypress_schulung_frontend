/// <reference types="cypress" />

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
import './commands'


declare namespace Cypress {
    interface Chainable {
        loginByUi(username: string): Chainable;
        loginTestUser(): Chainable;

    }
}

Cypress.Commands.add('loginByUi', (username: string) => {
    cy.visit("/login");
    cy.contains("Sign in");
    cy.get('.auth-page').should('contain', 'Sign in');

    // enter user data
    cy.get("[data-testid=email]").type(username);
    cy.get("[data-testid=password]").type(`${Cypress.env("LOGIN_PASSWORD")}`);

    cy.get('.auth-page').screenshot();
    // click login button
    cy.get('[data-testid="login-button"]').click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    // check if user is logged in
    cy.get('[data-testid="username"]').should("contain", "Test User");

})

Cypress.Commands.add("loginTestUser", () => {
    return cy
        .request({
            method: "POST",
            url: "http://vrt.struckmeier.name:3000/api/users/login",
            body: {
                user: {
                    email: "testuser@example.com",
                    password: "password",
                },
            },
        })
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.user).to.have.property("token");
            localStorage.setItem("jwtToken", response.body.user.token);
        });
});


// Alternatively you can use CommonJS syntax:
// require('./commands')