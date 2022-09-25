/// <reference types="cypress" />

import { loginAs } from "../helper/login";

describe("login", () => {
  beforeEach(() => {});

  it("should be able to log in", () => {
    // check if log in page is correct
    cy.visit("https://www.cypress.io");
    cy.url().should("contain", "cypress.io");
    cy.contains(
      "Fast, easy and reliable testing for anything that runs in a browser"
    );

    cy.origin("https://search.brave.com", () => {
      cy.visit("/");

      cy.get("#searchbox").type("cypress docs origin");
      cy.get("#searchbox").type("{enter}");
      cy.contains("origin | Cypress Documentation").click();
    });

    cy.get(".main-content-header").should("contain", "origin");
  });
});
