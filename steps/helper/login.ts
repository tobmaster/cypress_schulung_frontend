import { rollen } from "./rollen";

export function login(username, password) {
  cy.visit("/login");
  cy.url().should("contain", "/login");
  cy.get(".auth-page").contains("Sign in");
  cy.get('[data-testid="email"]').as("emailinput");
  cy.get("@emailinput").type(username);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
}

export function loginAs(role) {
  const { username, password } = rollen[role];
  login(username, password);
  cy.get('[data-testid="username"]').should("contain", rollen[role].name);
}
