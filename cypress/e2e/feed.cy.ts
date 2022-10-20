describe('Login und feed', () => {

    it('should login as test user and validate entry', () => {
        const expectedTags = ['cypress','e2e','testing'];

        // Arrange
        cy.visit('/login');
        cy.url().should('equal', `${Cypress.config().baseUrl}/login`);
        cy.get('.auth-page').contains('Sign in');
        cy.get('[data-testid="email"]').type('testuser@example.com');
        cy.get('[data-testid="password"]').type('password');
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="username"]').should('contain', 'testuser');
        
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