context('User', () => {

    beforeEach(() => {
        // navigate to sign up page
        cy.visit('/login');

        cy.server();
        cy.fixture('yourfeed').as('personalfeed');
        cy.route('GET', '**/articles/feed?**', '@personalfeed').as('getfeed');
    });

    it('should render the site after login', () => {
        cy.get('.auth-page').should('contain', 'Sign in');
        cy.get('input[formcontrolname="email"]').type('max@google.com');
        cy.get('input[formcontrolname="password"]').type('geheim');

        cy.get('button[type="submit"]').click();

        cy.get('app-article-list').contains('Berlin');

        cy.screenshot();

    });

    it('should render an article list', () => {
        cy.get('.auth-page').should('contain', 'Sign in');
        cy.get('input[formcontrolname="email"]').type('max@google.com');
        cy.get('input[formcontrolname="password"]').type('geheim');

        cy.get('button[type="submit"]').click();

        cy.get('app-article-list').contains('Berlin');

        cy.get('.page')
            .screenshot('article-list');

    });
});