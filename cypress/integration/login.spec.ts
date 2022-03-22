import { loginAs } from '../helper/login';

describe('login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it.only('login as example user', () => {
    cy.loginByUI();
    cy.get('[data-testid="global-feed"]').click();
    cy.get('[data-testid="article-preview"]').should('have.length', 3);
    cy.get('[data-testid="article-preview"]')
      .eq(0)
      .find('.preview-link')
      .contains('End to end testing leichtgemacht');
  });

  it('login as tobi user', () => {
    loginAs('tobi');

    cy.get('[data-testid="article-preview"]').should('have.length', 2);
    cy.get('[data-testid="article-preview"]')
      .eq(1)
      .find('.preview-link')
      .contains('Cypress makes life awesome!');
  });
});
