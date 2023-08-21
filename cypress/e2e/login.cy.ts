/// <reference types="cypress" />
describe("Navigate to Log In page", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should be able to log in", () => {
        // check if log in page is correct
        cy.contains("Sign in");
        cy.get('.auth-page').should('contain', 'Sign in');

        // enter user data
        cy.get("[data-testid=email]").type("testuser@example.com");
        cy.get("[data-testid=password]").type("password");

        cy.get('.auth-page').screenshot();
        // click login button
        cy.get('[data-testid="login-button"]').click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);

        // check if user is logged in
        cy.get('[data-testid="username"]').should("contain", "Test User");
    });
});
