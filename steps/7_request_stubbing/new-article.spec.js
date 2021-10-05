/// <reference types="cypress" />
describe("New Article", () => {
  beforeEach(() => {
    cy.intercept('POST', '**/articles').as('postArticle');
    cy.loginByUI();
  });

  it('should send appropriate body parameters', () => {
    cy.findByRole('link', { name: 'New Article' }).click();

    cy.url().should('include', '/editor');

    cy.findByRole('textbox', { name: 'Article Title' }).type('Sample Article Title');
    cy.findByRole('textbox', { name: 'Description' }).type('Sample Article Description');

    cy.findByRole('button', { name: 'Publish Article' }).click();

    cy.wait('@postArticle').its('request.body').should('deep.equal', { article: 
      {
          title: 'Sample Article Title',
          description: 'Sample Article Description',
          body: "",
          tagList: [],
      },
    });
  
  });

});
