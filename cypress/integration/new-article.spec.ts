/// <reference types="Cypress" />

describe('Feed', () => {

    beforeEach(() => {
        cy.intercept('POST', '**/api/articles').as('publishArticle');
        cy.loginByUI();
    })

    it('should show proper "Your Feed"', () => {
        const blog = {
            title: 'Sample title',
            description: 'Sample description'
        };
        cy.contains('Your Feed');

        cy.findByRole('link', { name: 'New Article' }).click();

        cy.url().should('include', '/editor');

        cy.findByRole('textbox', { name: /Article Title/i }).type(blog.title);        
        cy.findByRole('textbox', { name: /Description/i }).type(blog.description);
        
        cy.findByRole('button', { name: /Publish Article/i }).click();

        cy.wait('@publishArticle').its('request.body').should('deep.equal', {
            article: {
                body: '',
                tagList: [],
                ...blog,
            }
        });
    })
});