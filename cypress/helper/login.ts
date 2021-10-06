
export default function login() {
    cy.visit('/login');
    cy.get('[data-testid=email]').as('email');

    cy.get('@email').type('testuser@example.com');
    cy.get('[data-testid=password]').type('password');

    cy.get('[data-testid=login-button]').click();

    cy.log('Login Succeded', Cypress.config())
    
    cy.url().should('include', `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid=username]', {timeout: 8000}).should('contain', 'Testuser');
};