// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add(
  "loginByUI",
  (username = "testuser@example.com", password = "password") => {
    cy.visit("/login");
    cy.url().should("contain", "/login");
    cy.get(".auth-page").contains("Sign in");
    cy.get('[data-testid="email"]').as("emailinput");
    cy.get("@emailinput").type(username);
    cy.get('[data-testid="password"]').type(password);
    return cy.get('[data-testid="login-button"]').click();
  }
);

Cypress.Commands.add("loginTestUser", () => {
  return cy
    .request({
      method: "POST",
      url: "http://vrt.struckmeier.name:3000/api/users/login",
      body: {
        user: {
          email: "testuser@example.com",
          password: "password",
        },
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user).to.have.property("token");
      localStorage.setItem("jwtToken", response.body.user.token);
    });
});
