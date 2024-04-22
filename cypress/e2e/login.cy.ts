/// <reference types="cypress" />

describe("Login", { defaultCommandTimeout: 10000 }, () => {

    beforeEach(() => {
        cy.loginRole('teilnehmer');
    })

    it("should login and have the correct article", () => {
        //delayLogin(4100);


        cy.get('[data-testid="global-feed"]').click();

        /* Loading spinner
                cy.get('app-article-list').contains('Loading articles...')
                    .should('be.visible');
                cy.get('app-article-list').contains('Loading articles...')
                    .should('not.be.visible');*/

        cy.get('app-article-preview')
            .eq(0)
            .should('contain', 'END-TO-END TESTING THE EASY WAY');
    });


    it.only("should show appropriate values from feed", () => {
        /**
         * cy.intercept('/api/articles?**', { fixture: 'yourfeed.json' })
         *   .as('getArticles');
        */
        cy.intercept('**/api/articles?**')
            .as('getArticles');

        cy.get('[data-testid="global-feed"]').click();

        cy.wait('@getArticles').then((feedResponse) => {
            cy.log(feedResponse.response.body.articlesCount);

            cy.get('[data-testid="article-preview"]')
                .should('have.length', feedResponse.response.body.articlesCount);

            feedResponse.response.body.articles.forEach((article, index) => {
                cy.get('[data-testid="article-preview"]').eq(index).find('h1')
                    .should('contain', article.title);
            });
        });



    });

});


