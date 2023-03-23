export function login(email, password, username) {
    cy.visit("/login");
    cy.url().should("contain", "/login");
    cy.get(".auth-page").contains("Sign in");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password + "{enter}");
    cy.get('[data-testid="username"]').should("contain", username);
}
