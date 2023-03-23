describe("empty spec", () => {
    it("passes", () => {
        const email = "testuser@example.com";

        cy.visit("/login");
        cy.url().should("contain", "/login");
        cy.get(".auth-page").contains("Sign in");

        cy.get('[data-testid="email"]').type(email);
        cy.get('[data-testid="password"]').type("password{enter}");
        //cy.get('[data-testid="login-button"]').click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    /*it("should get newsletter", () => {
        cy.visit("https://javascript-days.de/muenchen/");
        cy.contains("Alle akzeptieren").click();
        cy.contains("Newsletter bestellen").click();
    });*/
});
