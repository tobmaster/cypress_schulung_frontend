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

Cypress.Commands.add("loginTestUser", () => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("api")}/api/users/login`,
      body: {
        user: {
          email: Cypress.env("username"),
          password: Cypress.env("password"),
        },
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.user).to.have.property("token");
      localStorage.setItem("jwtToken", response.body.user.token);
    });
});
