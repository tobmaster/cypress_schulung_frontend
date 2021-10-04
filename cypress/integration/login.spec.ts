/// <reference types="Cypress" />

describe('Login', () => {

    beforeEach(() => {
        cy.visit('/login');
    })

    it('should navigate to the login', () => {
        cy.get('app-auth-page').contains('Sign in');
        
        cy.get('[data-testid=email]').as('email');

        cy.visit('/');
        cy.contains('Sign in').click();

        //cy.get('[data-testid=email]').type('testuser@example.com');

        cy.get('@email').type('testuser@example.com');
        
        cy.get('[data-testid=password]').type('password');

        cy.get('[data-testid=login-button]').click();

        cy.url().should('include', `${Cypress.config().baseUrl}/`);
        
        cy.get('[data-testid=username]').should('contain', 'Testuser');

        cy.contains('.nav-item', 'Your Feed')
            .find('.nav-link')
            .should('have.class', 'active');

    })

});