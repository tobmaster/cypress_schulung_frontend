describe('template spec', () => {

    it('passes', () => {
        cy.visit('/login');

        cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);

        cy.get('[data-testid="login-form"]')
            .should('contain', 'Sign in');

        cy.get('[data-testid="email"]')
            .type("testuser@example.com");
        cy.get('[data-testid="password"]')
            .type("password{enter}");

        cy.get('[data-testid="username"]')
            .should('contain', 'Test User');

        cy.get('[data-testid="your-feed"]')
            .should('have.class', 'active');

        /*       cy.get('[data-testid="login-button"]')
                   .click();*/

    })
})