context('User', () => {

    beforeEach(() => {
        // navigate to sign up page
        cy.visit('/login');

        cy.server();
        cy.fixture('yourfeed').as('personalfeed');
        cy.route('GET', '**/articles/feed?**', '@personalfeed');
    });

    it('should be able to login', () => {
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

    it('should show a personal feed', () => {
        // check if log in page is correct
        cy.url().should('include', '/login');
        cy.get('.auth-page')
            .should('contain', 'Sign in');

        // enter user data
        cy.get('input[formcontrolname="email"]').type('tobi@somewhere.com');
        cy.get('input[formcontrolname="password"]').type('Hannah');

        // click submit button
        cy.get('button[type="submit"]').click();

        cy.get('app-article-list')
            .children('app-article-preview')
            .should('have.length', 2);

    });
});