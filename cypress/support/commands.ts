/// <reference types="cypress" />

export { };

Cypress.Commands.add('loginByUI', (username, password) => {
    cy.visit('/login');
    cy.get('.auth-page').contains('Sign in');

    cy.get('[data-testid="email"]')
        .type(username);

    cy.get('[data-testid="password"]')
        .type(password, { log: false });

    cy.get('[data-testid="login-button"]')
        .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('loginByAPI', (username, password) => {
    return cy.request({
        method: "POST",
        url: "http://vrt.struckmeier.name:3000/api/users/login",
        body: { "user": { "email": username, "password": password } }
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.user).to.have.property("token");
        localStorage.setItem('jwtToken', response.body.user.token);
    })
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginByUI(username: string, password: string): Chainable
            loginByAPI(username: string, password: string): Chainable
        }
    }
}