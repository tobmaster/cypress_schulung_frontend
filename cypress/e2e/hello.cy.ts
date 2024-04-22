
describe('adesso.de', () => {
  it('should visit adesso', () => {
    cy.visit('https://adesso.de');
    cy.contains('Alle akzeptieren')
      .click();
    cy.get('.navbar-header > .adesso-search-toggle')
      .click();
    cy.get('.adesso-header-search-field[type="text"]')
      .type('Cypress{enter}');

    cy.get('.h1').should('contain', 'Suchergebnisse');

  })
})