describe('Feed', () => {
  beforeEach(() => {
    cy.intercept('**/articles/feed?**').as('yourfeed');
    cy.loginByUI();
  });

  it('should show proper feed', () => {
    cy.wait('@yourfeed');
    cy.get('[data-testid=article-preview]').should('have.length', 2);

    cy.get('[data-testid=article-preview]')
      .eq(0)
      .find('h1')
      .should('contain', 'Cypress Workshop Berlin');
    cy.get('[data-testid=article-preview]')
      .eq(0)
      .find('p')
      .should('contain', 'Ein Workshop über E2E testinmg');

    cy.get('[data-testid=article-preview]')
      .eq(1)
      .find('h1')
      .should('contain', 'Effizientes e2e');
    cy.get('[data-testid=article-preview]')
      .eq(1)
      .find('p')
      .should('contain', 'e2e Testing macht Spaß');
  });

  it.only('should show proper feed from response', () => {
    cy.wait('@yourfeed').then((feedRes) => {
      console.log(feedRes);
      const { articles } = feedRes.response.body;

      cy.get('[data-testid=article-preview]').should(
        'have.length',
        articles.length
      );

      articles.forEach((article, index) => {
        cy.get('[data-testid=article-preview]')
          .eq(index)
          .find('h1')
          .should('contain', article.title);
        cy.get('[data-testid=article-preview]')
          .eq(index)
          .find('p')
          .should('contain', article.description);
      });
    });
  });
});
