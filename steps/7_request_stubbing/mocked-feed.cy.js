
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

  it('should ensure tobi feels good', ()=> {
    cy.intercept('**/articles?*', (request)=> {
        request.reply((response)=> {
            const newResponse = {...response};
            newResponse.body.articles = newResponse.body.articles.map((article)=>{
                if(article.author.username === 'Tobias') {
                    return  {
                        ...article,
                        favoritesCount: 9999999999
                    }
                } 
                return article;
            })
            return newResponse;
        })
    }).as('globalfeed');
    cy.visit('/');
    cy.contains('Global Feed').click();
    cy.wait('@globalfeed');
    cy.get('app-favorite-button').eq(0).should('contain', '9999999999');
  })
});
