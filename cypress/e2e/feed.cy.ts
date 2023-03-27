/// <reference types="cypress" />

describe("Feed", () => {
    beforeEach(() => {
        cy.intercept("**/articles/feed?**", {fixture: "yourfeed.json"}).as(
            "yourfeed"
        );

        cy.visit('/login');
        cy.get('.auth-page').contains('Sign in');

        cy.get('[data-testid="email"]')
            .type('testuser@example.com');

        cy.get('[data-testid="password"]')
            .type('password');


        cy.get('[data-testid="login-button"]')
            .click();
    });

    /** Check the response from fixture */
    it('show appropriate "Your Feed" from fixture', () => {
        cy.get("[data-testid=article-preview]").should("have.length", 2);

        cy.get("[data-testid=article-preview]")
            .eq(0)
            .find("h1")
            .should("contain", "Cypress Workshop über E2E testing");
        cy.get("[data-testid=article-preview]")
            .eq(0)
            .find("p")
            .should("contain", "Ein Workshop über E2E testing");

        cy.get("[data-testid=article-preview]")
            .eq(1)
            .find("h1")
            .should("contain", "Effizientes e2e");
        cy.get("[data-testid=article-preview]")
            .eq(1)
            .find("p")
            .should("contain", "e2e Testing macht Spaß");
    });

    /** Check the values from response independent of the response */
    it('show appropriate "Your Feed" values from response independent of the response', () => {
        cy.wait("@yourfeed").then((feedRes) => {
            cy.get("[data-testid=article-preview]").should(
                "have.length",
                feedRes.response.body.articles.length
            );
            feedRes.response.body.articles.forEach((article, index) => {
                cy.get("[data-testid=article-preview]")
                    .eq(index)
                    .find("h1")
                    .should("contain", article.title);
                cy.get("[data-testid=article-preview]")
                    .eq(index)
                    .find("p")
                    .should("contain", article.description);
            });
        });
    });
});
