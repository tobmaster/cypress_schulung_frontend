/// <reference types="cypress" />

describe("Tasty Toaster", () => {
  it("should toast", () => {
    cy.visit("https://tobmaster.gitlab.io/tasty-toaster/");
  });
});
