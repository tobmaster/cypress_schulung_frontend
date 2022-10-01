import { surpressGdpr } from "../helper/supressgdpr";

describe("openid", () => {
  it("should login properly", () => {
    surpressGdpr();
    cy.visit("https://openidconnect.net/");
    cy.contains("Start").click();
    cy.origin("https://samples.auth0.com/", () => {
      cy.get("#username").type("hans@example.com");
      cy.get("#password").type("secret{enter}");
    });
    cy.get(".code-snippet").should("exist");
  });
});
