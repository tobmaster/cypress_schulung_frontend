import { login } from "../helper/login";

describe("Login", () => {
  beforeEach(() => {
    login('testuser@example.com', 'password');
  });

  it("should be able to login", () => {
    const tags = ["e2e", "testing", "cypress"];
    

    cy.get('[data-testid="global-feed"]').click();

    cy.get('[data-testid=article-preview]').eq(0).as('article');

    cy.log('Config', Cypress.config())
    cy.get('@article').find('.preview-link').contains('Impostor says "End-To-End Testing leichtgemacht"');
    cy.get('@article').find('.tag-list > .tag-pill').as('tags')

    cy.get('@article').find('.tag-list > .tag-pill').then((taglist) => {
      tags.forEach((element)=>{
        cy.wrap(taglist).should('contain', element);
      })
    });
    

    cy.get('@tags').eq(0).should('contain', 'e2e')
    cy.get('@tags').eq(1).should('contain', 'testing')
    cy.get('@tags').eq(2).should('contain', 'ng-de');

    });
  
});
