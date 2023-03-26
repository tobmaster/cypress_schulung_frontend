/// <reference types="cypress" />
describe("Navigate to Log In page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.url().should("include", "/login");
  });

  it("should be able to log in", () => {
    // check if log in page is correct
    cy.contains("Sign in");
    cy.get(".auth-page").should("contain", "Sign in");

    // enter user data
    cy.get("[data-testid=email]").type("testuser@example.com");
    cy.get("[data-testid=password]").type("password");

    // click login button
    cy.get('[data-testid="login-button"]').click();

    // check if user is logged in
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.contains(".nav-item", "Your Feed")
      .find(".nav-link")
      .should("have.class", "active");

    cy.get('[data-testid="username"]').should("contain", "Test User");
  });
});
