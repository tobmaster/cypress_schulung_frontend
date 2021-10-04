/// <reference types="cypress" />
describe("Navigate to Log In page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.url().should('include', '/login');
    // enter user data
    cy.get('[data-testid=email]').type('testuser@example.com');
    cy.get('[data-testid=password]').type('password');

    cy.get('[data-testid=login-button]').click();

    cy.intercept('**/articles/feed?**').as('yourfeed');
    cy.intercept('**/tags').as('tags');
  });

  it('show appropriate "Your Feed"', () => {
    cy.wait(['@yourfeed', '@tags']).then(([feedRes, tagsRes]) => {
      cy.get('[data-testid=article-preview]')
      .should('have.length', feedRes.response.body.articles.length);
      feedRes.response.body.articles.forEach((article, index) => {
        cy.get('[data-testid=article-preview]').eq(index).find('h1').should('contain', article.title);
        cy.get('[data-testid=article-preview]').eq(index).find('p').should('contain', article.description);
      });
    });
  });
});
