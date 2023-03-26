describe("Login und feed", () => {
  beforeEach(() => {
    cy.intercept("**/articles/feed?**", { fixture: "yourfeed.json" }).as(
      "yourfeed"
    );

    cy.loginByAPI();
    cy.visit("/");
  });

  it("should login as test user and validate entry", () => {
    const expectedTags = ["cypress", "e2e", "testing"];

    // Arrange
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

    //cy.pause();

    // Act
    cy.get('[data-testid="global-feed"]').click();

    cy.get("[data-testid=article-preview]").as("articles");

    cy.get("@articles").should("contain", "END-TO-END");

    cy.get("@articles")
      .contains("END-TO-END")
      .find(".tag-list > .tag-pill")
      .as("tags");

    cy.get("@tags").then((taglist) => {
      expectedTags.forEach((tag) => {
        cy.wrap(taglist).should("contain", tag);
      });
    });
  });

  it("should login as test user and validate entry", () => {
    const expectedTags = ["cypress", "e2e", "testing"];

    // Arrange
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

    //cy.pause();

    // Act
    cy.get('[data-testid="global-feed"]').click();

    cy.get("[data-testid=article-preview]").as("articles");

    cy.get("@articles").should("contain", "END-TO-END");

    cy.get("@articles")
      .contains("END-TO-END")
      .find(".tag-list > .tag-pill")
      .as("tags");

    cy.get("@tags").then((taglist) => {
      expectedTags.forEach((tag) => {
        cy.wrap(taglist).should("contain", tag);
      });
    });
  });

  it("should login as test user and validate entry", () => {
    const expectedTags = ["cypress", "e2e", "testing"];

    // Arrange
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

    //cy.pause();

    // Act
    cy.get('[data-testid="global-feed"]').click();

    cy.get("[data-testid=article-preview]").as("articles");

    cy.get("@articles").should("contain", "END-TO-END");

    cy.get("@articles")
      .contains("END-TO-END")
      .find(".tag-list > .tag-pill")
      .as("tags");

    cy.get("@tags").then((taglist) => {
      expectedTags.forEach((tag) => {
        cy.wrap(taglist).should("contain", tag);
      });
    });
  });

  it("should login as test user and validate entry", () => {
    const expectedTags = ["cypress", "e2e", "testing"];

    // Arrange
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

    //cy.pause();

    // Act
    cy.get('[data-testid="global-feed"]').click();

    cy.get("[data-testid=article-preview]").as("articles");

    cy.get("@articles").should("contain", "END-TO-END");

    cy.get("@articles")
      .contains("END-TO-END")
      .find(".tag-list > .tag-pill")
      .as("tags");

    cy.get("@tags").then((taglist) => {
      expectedTags.forEach((tag) => {
        cy.wrap(taglist).should("contain", tag);
      });
    });
  });

  it("should login as test user and validate entry", () => {
    const expectedTags = ["cypress", "e2e", "testing"];

    // Arrange

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

    //cy.pause();

    // Act
    cy.get('[data-testid="global-feed"]').click();

    cy.get("[data-testid=article-preview]").as("articles");

    cy.get("@articles").should("contain", "END-TO-END");

    cy.get("@articles")
      .contains("END-TO-END")
      .find(".tag-list > .tag-pill")
      .as("tags");

    cy.get("@tags").then((taglist) => {
      expectedTags.forEach((tag) => {
        cy.wrap(taglist).should("contain", tag);
      });
    });
  });
});
