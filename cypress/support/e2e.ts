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

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare namespace Cypress {
    interface Chainable {
        loginByUI(username: string, password: string): Chainable;
        loginByApi(username: string, password: string): Chainable;
    }
}


Cypress.Commands.add(
    "loginByUI",
    (username = "testuser@example.com", password = "password") => {
        cy.visit("/login");
        cy.url().should("contain", "/login");
        cy.get(".auth-page").contains("Sign in");
        cy.get('[data-testid="email"]').as("emailinput");
        cy.get("@emailinput").type(username);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="login-button"]').click();
    }
)

Cypress.Commands.add(
    "loginByApi",
    (username = "testuser@example.com", password = "password") => {
     return cy.request({
        method: "POST",
        url: "http://vrt.struckmeier.name:3000/api/users/login",
        body: {
            user: {
                email: username,
                password: password
            }
        }
     }).then((response)=> {
        expect(response.status).to.eq(200);
        expect(response.body.user).to.have.property("token");
        localStorage.setItem('jwtToken', response.body.user.token);
     })
    }
    )
//export {};