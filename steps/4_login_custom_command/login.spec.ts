/// <reference types="cypress" />

import { delayLogin } from '../helper/delay';

describe('Navigate to Log In page', () => {
  beforeEach(() => {
    cy.loginByUI();
    cy.visit('/');
  });

  it('should be able to log in', () => {
    cy.get('[data-testid="username"]').should('contain', 'Test User');

    cy.get('app-article-list')
      .find('app-article-preview')
      .should('have.length', 2);
  });
});
