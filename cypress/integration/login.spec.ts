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

    cy.get('[data-testid="username"]', { timeout: 10000 }).should(
      "have.text",
      "Test User"
    );
  });
});

// Ingorien
/*cy.get('[data-testid="username"]').should(($el) => {
      expect($el).to.contain("Test User");
    });*/
