
describe("Login", () => {
  beforeEach(() => {
    cy.intercept('**/articles/feed?*', { fixture: 'yourfeed.json' }).as('yourfeed');
    cy.loginByUI();
  });

  it("should be able to login", () => {

    cy.wait('@yourfeed').its('response.statusCode').should('equal', 200);
    cy.get('[data-testid=article-preview]').eq(0).as('article');


    cy.get('[data-testid=article-preview]').eq(0).find('h1').should('contain', 'Cypress Workshop Berlin');
    cy.get('[data-testid=article-preview]').eq(0).find('p').should('contain', 'A workshop on E2E testing');

    cy.get('[data-testid=article-preview]').eq(1).find('h1').should('contain', 'Efficient E2E');
    cy.get('[data-testid=article-preview]').eq(1).find('p').should('contain', 'E2E Testing is fun!');
    });  
});
