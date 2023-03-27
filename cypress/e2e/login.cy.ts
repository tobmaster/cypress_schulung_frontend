describe('Login', () => {

  it('should be possible to login', () => {
    cy.visit('http://localhost:4200');
    cy.get('.banner > .container > .logo-font')
      .should('contain', 'conduit')
  })

})