/// <reference types="Cypress" />

describe('Login', () => {

    beforeEach(() => {
        cy.visit('/login');
    })

    it('should navigate to the login', () => {
    
        cy.get('app-auth-page').contains('Sign in');
        cy.contains('Sign in').click();
        cy.getByTestId('email').type('testuser@example.com');
        cy.getByTestId('password').type('password');
        cy.getByTestId('login-button').click();
        cy.url().should('include', `${Cypress.config().baseUrl}/`);
        cy.get('[data-testid=username]').should('contain', 'Testuser');
        
        cy.contains('Global Feed').click();

        cy.get('[data-testid=article-preview]').eq(1)
        .find('h1').should('contain', 'End-To-End Testing leichtgemacht');

        cy.get('[data-testid=article-preview]').eq(1)
        .find('.tag-list > .tag-pill').as('tags');

        cy.get('@tags').eq(0).should('contain', 'e2e');
        cy.get('@tags').eq(1).should('contain', 'testing');
        cy.get('@tags').eq(2).should('contain', 'cypress');

        cy.get('@tags').eq(2).screenshot('filename');

    })

});