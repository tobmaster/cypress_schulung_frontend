

describe('Login und feed', () => {
    beforeEach(() => {
        cy.intercept('**/articles/feed?**', { fixture: 'yourfeed.json' }).as('yourfeed');

        cy.visit('/login');
        cy.loginByUI();
    });

    it('should login as test user and validate entry', () => {
        dle
        const expectedTags = ['cypress','e2e','testing'];

        // Arrange
        cy.wait('@yourfeed').its('response.statusCode').should('equal', 200);

        cy.get('[data-testid=article-preview]').eq(0).find('h1').should('contain', 'Cypress Workshop Berlin');
        cy.get('[data-testid=article-preview]').eq(0).find('p').should('contain', 'Ein Workshop über E2E testinmg');

        cy.get('[data-testid=article-preview]').eq(1).find('h1').should('contain', 'Effizientes e2e');
        cy.get('[data-testid=article-preview]').eq(1).find('p').should('contain', 'e2e Testing macht Spaß');

        //cy.pause();
        

        // Act
        cy.get('[data-testid="global-feed"]').click();

        cy.get('[data-testid=article-preview]').as('articles');

        cy.get('@articles').should('contain', 'END-TO-END');
        
        cy.get('@articles').contains('END-TO-END')
            .find('.tag-list > .tag-pill').as('tags');

        cy.get('@tags').then((taglist)=>{
            expectedTags.forEach((tag) => {
                cy.wrap(taglist).should('contain', tag);
            })
        });
        /*
        cy.get('@tags').eq(0).should('contain', 'cypress');
        cy.get('@tags').eq(1).should('contain', 'testing');
        cy.get('@tags').eq(2).should('contain', 'e2e');*/
        // Asset
    })
  
  })