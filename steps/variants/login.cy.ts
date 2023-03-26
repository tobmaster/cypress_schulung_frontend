//import { delayLogin } from "../helper/delay";

describe("Login", () => {
  beforeEach(() => {
    //  delayLogin();

    cy.visit("/login");
    cy.url().should("equal", `${Cypress.config().baseUrl}/login`);
    cy.get(".auth-page").contains("Sign in");
  });

  it("should login as test user", () => {
    cy.get('[data-testid="email"]').type("testuser@example.com");
    cy.get('[data-testid="password"]').type("password");

    cy.get('[data-testid="login-button"]').click();

    //cy.get('[data-testid="username"]', {timeout: 6000}).should('contain', 'testuser');
    cy.get('[data-testid="username"]', { timeout: 100000000000000 }).should(
      "contain",
      "testuser"
    );
  });

  it.skip("should not login with wrong password", () => {
    cy.get('[data-testid="email"]').type("testuser@example.com");
    cy.get('[data-testid="password"]').type("wrong");

    cy.get('[data-testid="login-button"]').click();
    cy.get(".error-messages > li").should("contain", "notFound User Not Found");
  });
});
