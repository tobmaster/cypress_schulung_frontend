describe('empty spec', () => {
  beforeEach(() => {
    const email = "testuser@example.com";

    cy.visit("/login");
    cy.url().should("contain", "/login");
    cy.get(".auth-page").contains("Sign in");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type("password{enter}");
    cy.get('[data-testid="username"]').should("contain", "Test User");
  })

  it('should show your feed', () => {
    cy.intercept('**/articles/feed?**')
        .as('yourFeed');
    cy.visit('/');

    cy.wait('@yourFeed').then((feedRes) => {
      cy.get('[data-testid=article-preview]')
          .should('have.length', feedRes.response.body.articles.length);

      feedRes.response.body.articles.forEach((article, index) => {
        cy.get('[data-testid=article-preview]').eq(index).find('h1')
            .should('contain', article.title);
        cy.get('[data-testid=article-preview]').eq(index).find('p')
            .should('contain', article.description);
      });
    })
  })
})