/// <reference types="cypress" />

describe("login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("login as example user", () => {
    cy.get(".auth-page").contains("Sign in");

    cy.get('[data-testid="email"]').type("testuser@example.com");

    cy.get('[data-testid="password"]').type("password");

    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="username"]').should("contain", "Test User");

    cy.get('[data-testid="global-feed"]').click();

    cy.get('[data-testid="article-preview"]').should("have.length", 3);

    cy.get('[data-testid="article-preview"]')
      .eq(0)
      .find(".preview-link")
      .contains("End to end testing leichtgemacht");
  });
});

// Ingorien
/*cy.get('[data-testid="username"]').should(($el) => {
      expect($el).to.contain("Test User");
    });*/
