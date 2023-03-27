describe('Login', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('should be possible to login', () => {
        cy.get('.auth-page').contains('Sign in');

        cy.get('[data-testid="email"]')
            .type('testuser@example.com');

        cy.get('[data-testid="password"]')
            .type('password');


        cy.get('[data-testid="login-button"]')
            .click();

        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('[data-testid="your-feed"]').should('have.class', 'inactive');
    })
})