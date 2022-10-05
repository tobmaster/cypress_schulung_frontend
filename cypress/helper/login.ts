
export function login(username, password) {
    cy.visit("/login");

    cy.url().should('contains', '/login');
    cy.get('h1').should('contain', 'Sign in');
    cy.get('[data-testid="email"]').type(username);
    cy.get('[data-testid="password"]').type(password);

    cy.get('[data-testid="login-button"]').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/` );

    cy.get('[data-testid="username"]')
      .contains(username);
  }