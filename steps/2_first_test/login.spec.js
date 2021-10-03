context('Navigate to Log In page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should show header "Sign in"', () => {
    cy.contains('Sign in');
  });
});