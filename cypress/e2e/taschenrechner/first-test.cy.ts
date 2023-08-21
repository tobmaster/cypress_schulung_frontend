describe('adesso website', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  })

  it('should do something', () => {
    cy.contains('conduit');
    cy.contains('Sign in').should('be.visible');
    cy.contains('Sign in').click();
    cy.get('[data-testid="login-form"]').contains('Sign in');
  })

})