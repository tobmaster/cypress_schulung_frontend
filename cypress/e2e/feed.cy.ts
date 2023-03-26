describe('Test Feed', () => {
    beforeEach(() => {
        cy.intercept('**/articles/feed?**', {fixture: 'yourfeed'}).as('articles');

        cy.loginByUI("testuser@example.com", "password");
    });

    it('should contain correct articles', () => {
        cy.wait('@articles')
            .then((articlesResult) => {
                cy.get('.article-preview')
                    .should('have.length', articlesResult.response.body.articles.length);
            })

        cy.get('.article-preview')
            .should('have.length', 2);

        cy.get('.article-preview').eq(0).then(($article) => {
            cy.wrap($article).find('h1').should('have.text', 'Cypress Workshop Berlin');
            cy.wrap($article).find("p").should('have.text', 'Ein Workshop über E2E testing');
        });
    });

    it('', () => {
        cy.wait('@articles')
            .then((articlesResult) => {

                articlesResult.response.body.articles.forEach((article, index) => {
                    cy.get('.article-preview').eq(index).should('contain', article.title);
                })
            });
    });
});
