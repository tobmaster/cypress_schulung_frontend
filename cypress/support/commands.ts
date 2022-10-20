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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
    interface Chainable {
        loginByUI(username?: string, password?: string): Chainable
        loginByAPI(username?: string, password?: string): Chainable
    }
}

Cypress.Commands.add(
    "loginByUI",
    (username = "testuser@example.com", password = "password") => {
        cy.url().should('equal', `${Cypress.config().baseUrl}/login`);
        cy.get('.auth-page').contains('Sign in');
        cy.get('[data-testid="email"]').type(username);
        cy.get('[data-testid="password"]').type(password);
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="username"]').should('contain', 'testuser');
    }
)


Cypress.Commands.add(
    "loginByAPI",
    (username = "testuser@example.com", password = "password") => {
        cy.request({
            method: "POST",
            url: "http://vrt.struckmeier.name:3000/api/users/login",
            body: {
                user: {
                    email: username,
                    password: password
                }
            }
        }).then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.user).to.have.property('token');
          localStorage.setItem('jwtToken', response.body.user.token);
        })
    }
)

