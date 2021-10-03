context('User', () => {

    beforeEach(() => {
        // navigate to log in page
        cy.visit('/login');
    });

    it('should be able to log in', () => {
        // check if log in page is correct
        cy.url().should('include', '/login');
        cy.get('.auth-page')
            .should('contain', 'Sign in');

        // enter user data
        cy.get('input[formcontrolname="email"]').type('tobi@somewhere.com');
        cy.get('input[formcontrolname="password"]').type('Hannah');

        // click submit button
        cy.get('button[type="submit"]').click();

        // check if user is logged in
        cy.url()
            .should('eq', `${Cypress.config().baseUrl}/`);
        cy.contains('.nav-item', 'Your Feed')
            .should('exist');
        cy.get(':nth-child(4) > .nav-link')
            .should('contain', 'Tobi');
    });
});