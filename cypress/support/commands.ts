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
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('loginByUI', (email = 'testuser@example.com', password = 'password') => {

    cy.visit('/login');
    cy.get('app-auth-page').contains('Sign in');
    cy.contains('Sign in').click();
    cy.get('[data-testid=email]').type(email);
    cy.get('[data-testid=password]').type(password);
    cy.get('[data-testid=login-button]').click();
    cy.url().should('include', `${Cypress.config().baseUrl}/`);
    return cy.get('[data-testid=username]').should('contain', 'Testuser');

});

Cypress.Commands.add('getByTestId', (testid: string) => {
    return cy.get(`[data-testid=${testid}]`);
});


Cypress.Commands.add('loginTestUser', () => {
    return cy.request({
        method: 'POST',
        url: 'https://cypress.eu.ngrok.io/api/users/login',
        body: {
            user:{
                email:"testuser@example.com",
                password:"password"
            }
        }
    }).then((response) => {
        console.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.user).to.have.property('token');
        localStorage.setItem("jwtToken", response.body.user.token);
    });
});
