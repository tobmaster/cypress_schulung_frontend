/// <reference types="cypress" />

import { loginAs } from "../helper/login";

describe("login", () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should be able to log in', () => {
    // check if log in page is correct
    cy.contains('Sign in');

    cy.viewport('macbook-16');
    cy.origin('https://www.ecosia.org', () => {
      cy.visit('/')
      cy.get('.search-form__input').type('Cypress');
      cy.get('.search-form__input').type('{enter}');
      cy.pause()
    })
  });
});
