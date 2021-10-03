/// <reference types="cypress" />

import { delayLogin } from "../helper/delay";

describe("Navigate to Log In page", () => {
  beforeEach(() => {
    cy.loginTestUser();
    cy.visit("/");
  });

  it("should be able to log in", () => {
    cy.intercept("GET", "**/articles/feed?**", { fixture: "yourfeed.json" }).as(
      "personalfeed"
    );

    cy.get('[data-testid="username"]').should("contain", "Testuser");

    cy.wait("@personalfeed");
    cy.get("app-article-list")
      .find("app-article-preview")
      .should("have.length", 2);
  });
});
