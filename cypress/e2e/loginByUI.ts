export function loginByUI(email: string = 'testuser@example.com', password: string = "password") {
    cy.visit('/login');
    cy.get('.auth-page').contains('Sign in');

    cy.get('[data-testid="email"]')
        .type(email);

    cy.get('[data-testid="password"]')
        .type(password);

    cy.get('[data-testid="login-button"]')
        .click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
}
