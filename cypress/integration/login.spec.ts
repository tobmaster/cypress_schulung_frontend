describe("login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it.only("login as example user", () => {
    cy.get(".auth-page").contains("Sign in");

    cy.get('[data-testid="email"]').as("emailinput");

    cy.get("@emailinput").type("testuser@example.com");

    cy.get('[data-testid="password"]').type("password");

    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="username"]').should("contain", "Test User");

    cy.get('[data-testid="global-feed"]').click();

    cy.get('[data-testid="article-preview"]').should("", 3);

    cy.get('[data-testid="article-preview"]')
      .eq(0)
      .find(".preview-link")
      .contains("End to end testing leichtgemacht");
  });
});
