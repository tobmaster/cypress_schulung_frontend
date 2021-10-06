/// <reference types="Cypress" />

describe('Feed', () => {

    beforeEach(() => {
        cy.intercept('**/articles/feed?**', (req) => {

            req.continue((res) => {

                console.log(res);
                const { articles } = res.body;
                const changedArticles = articles.map((article) => ({...article, createdAt: new Date()}));
                res.send({ ...res, body: { ...res.body, articles: changedArticles } });

            });

        }).as('yourfeed');
        cy.loginTestUser();
        cy.visit('/');
    })

    it('should show proper "Your Feed"', () => {
        cy.wait('@yourfeed').then((xhr) => {
            const { articles } = xhr.response.body;
            cy.contains('Your Feed');
            cy.getByTestId('article-preview').should('have.length', articles.length);
            articles.forEach((article, index) => {
                cy.getByTestId('article-preview').eq(index).find('h1').should('contain', article.title);
                cy.getByTestId('article-preview').eq(index).find('p').should('contain', article.description);
            });
        });
    })
});