/// <reference types="cypress" />

import { loginAs } from "../helper/login";

describe("login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to log in", () => {
    // check if log in page is correct
    cy.visit("https://www.cypress.io");
    cy.contains("Sign in");

    cy.viewport("macbook-16");

    cy.origin("https://search.brave.com", () => {
      cy.visit("/");

      cy.get("#searchbox").type("Cypress");
      cy.get("#searchbox").type("{enter}");
      cy.contains("JavaScript End to End Testing Framework").click();
    });
    cy.origin("https://www.cypress.io", () => {
      cy.contains("The web has evolved. Finally, testing has too.").click();
    });
    cy.pause();
  });
});
