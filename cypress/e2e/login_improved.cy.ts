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

        cy.get('[data-testid="your-feed"]').should('have.class', 'active');


        /** Here **/
        cy.get('[data-testid=article-preview]').eq(1).as('article'); //alias

        cy.get('@article')
            .find('.tag-list > .tag-pill')
            .as('tags')

        cy.get('@article')
            .find('.preview-link')
            .contains('End-To-End Testing leichtgemacht');

        cy.get('@tags').eq(0)
            .should('contain', 'e2e');
        cy.get('@tags').eq(1)
            .should('contain', 'testing');
        cy.get('@tags').eq(2)
            .should('contain', 'cypress');
    })
})