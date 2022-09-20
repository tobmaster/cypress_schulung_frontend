describe('New Article', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/articles').as('postArticle');
    cy.loginTestUser();
    cy.visit('/');
  });

  it('should check if proper request payload is sent to backend', () => {
    cy.findByRole('link', { name: /New Article/i }).click();
    cy.url().should('include', '/editor');
    const sampleBlogPost = {
      title: 'Sample Article title',
      description: 'Sample Article description',
    };
    cy.findByRole('textbox', { name: /Article title/i }).type(
      sampleBlogPost.title
    );

    cy.findByRole('textbox', { name: 'Description' }).type(
      sampleBlogPost.description
    );

    cy.findByRole('button', { name: 'Publish Article' }).click();
    cy.wait('@postArticle')
      .its('request.body')
      .should('deep.equal', {
        article: {
          title: sampleBlogPost.title,
          description: sampleBlogPost.description,
          tagList: [],
          body: '',
        },
      });
  });
});
