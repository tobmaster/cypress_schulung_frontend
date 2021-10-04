/// <reference types="cypress" />
describe("Navigate to Log In page", () => {
    beforeEach(() => {
      cy.visit("/login");
      cy.url().should('include', '/login');
      // enter user data
      cy.get('[data-testid=email]').type('testuser@example.com');
      cy.get('[data-testid=password]').type('password');
  
      cy.get('[data-testid=login-button]').click();
  
      cy.intercept('**/articles/feed?**', { fixture: 'yourfeed.json' }).as('yourfeed');
    });
  
    it('show appropriate "Your Feed"', () => {
      cy.get('[data-testid=article-preview]')
      .should('have.length', 2);
  
      cy.get('[data-testid=article-preview]').eq(0).find('h1').should('contain', 'Cypress Workshop Berlin');
      cy.get('[data-testid=article-preview]').eq(0).find('p').should('contain', 'Ein Workshop über E2E testinmg');
  
      cy.get('[data-testid=article-preview]').eq(1).find('h1').should('contain', 'Effizientes e2e');
      cy.get('[data-testid=article-preview]').eq(1).find('p').should('contain', 'e2e Testing macht Spaß');
    });
  });
  