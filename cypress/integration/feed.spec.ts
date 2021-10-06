/// <reference types="Cypress" />

describe('Feed', () => {

    beforeEach(() => {
        cy.intercept('**/articles/feed?**', { fixture: 'yourfeed.json' }).as('yourfeed');
        cy.loginTestUser();
        cy.visit('/');
    })

    it('should show proper "Your Feed"', () => {
        cy.wait('@yourfeed');
        cy.contains('Your Feed');
        cy.getByTestId('article-preview').should('have.length', 2);
        cy.getByTestId('article-preview').eq(0).find('h1').should('contain', 'Cypress Workshop Berlin');
        cy.getByTestId('article-preview').eq(0).find('p').should('contain', 'Ein Workshop über E2E testinmg');
    })
});