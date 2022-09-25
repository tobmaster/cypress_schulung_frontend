/// <reference types="cypress" />

import { loginAs } from "../helper/login";

describe("login", () => {
  beforeEach(() => {
    cy.loginByUI();
    cy.visit("/");
  });

  it.only("login as example user", () => {
    cy.get('[data-testid="global-feed"]').click();
    cy.get('[data-testid="article-preview"]').should("have.length", 3);
    cy.get('[data-testid="article-preview"]')
      .eq(0)
      .find(".preview-link")
      .contains("End to end testing leichtgemacht");
  });
});
