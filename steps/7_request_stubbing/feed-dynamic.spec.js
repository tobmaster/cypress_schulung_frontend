/// <reference types="cypress" />
describe("Feed Dynamic", () => {
  beforeEach(() => {
    cy.loginByUI();
    cy.intercept("**/articles/feed?**", (req) => {
      // request sent to the server
      // req.reply();

      // request not sent to the server, responds with given fixture
      // req.reply({ fixture: 'yourfeed.json' });

      // sent to the server and intercepted the response
      req.continue((res) => {
        const { articles } = res.body;
        const changedArticles = articles.map((article) => {
          return { ...article, createdAt: new Date() };
        });
        res.send({ ...res, body: { ...res.body, articles: changedArticles } });
      });
    }).as("yourfeed");
  });

  it('show appropriate "Your Feed", with dynamic response', () => {
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
