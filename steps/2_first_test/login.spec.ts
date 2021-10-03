/// <reference types="cypress" />
describe("Navigate to Log In page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it('should be able to log in', () => {
    // check if log in page is correct
    cy.contains('Sign in');

    // enter user data
    cy.get('[data-cy=email]').type('testuser@example.com');
    cy.get('[data-cy=password]').type('password');

    // click login button
    cy.get('[data-cy="login-button"]').click();

    // check if user is logged in
    cy.get('[data-cy="username"]').should('contain', 'Testuser');
  });
});
