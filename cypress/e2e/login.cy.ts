/// <reference types="cypress" />

import { delayLogin } from "./helper/delay";

describe("Navigate to Log In page", () => {
    beforeEach(() => {
        //delayLogin();
        // http://vrt.struckmeier.name:3000/api/articles/feed?limit=10&offset=0
        // intercept the login request
        cy.intercept("GET", "**/api/articles/feed?limit=10&offset=0", { fixture: 'feed.json', times: 1 }).as("getFeed");
        cy.loginByUi("testuser@example.com");
    });

    it("should be able to log in", () => {
        // check if log in page is correct

        cy.wait("@getFeed").then((feedResult) => {
            cy.get("[data-testid=article-preview]")
                .should("have.length", feedResult.response.body.articlesCount);
        });
    });
});
