/// <reference types="cypress" />

describe("Feed", () => {
  beforeEach(() => {
    cy.loginByUI();
    cy.intercept("**/articles/feed?**", { fixture: "yourfeed.json" }).as(
      "yourfeed"
    );
  });

  /** Check the response from fixture */
  it('show appropriate "Your Feed" from fixture', () => {
    cy.get("[data-testid=article-preview]").should("have.length", 2);

    cy.get("[data-testid=article-preview]")
      .eq(0)
      .find("h1")
      .should("contain", "Cypress Workshop Berlin");
    cy.get("[data-testid=article-preview]")
      .eq(0)
      .find("p")
      .should("contain", "Ein Workshop über E2E testinmg");

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
