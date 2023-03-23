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
        cy.get('[data-testid="username"]').should("contain", "Test User");
        cy.get('[data-testid="your-feed"]').should("have.class", "active");
        cy.get('[data-testid="global-feed"]').click();
        //cy.get('[data-testid="article-preview"]').eq(1).as("article");
        cy.get('[data-testid="article-preview"]')
            .contains("Effizientes e2e")
            .as("article");

        cy.get("@article").should("contain", "Effizientes e2e");
        cy.get("@article").find(".tag-list > .tag-pill").as("tags");

        cy.get("@tags").should("contain", "e2e");
        cy.get("@tags").should("contain", "effizient");
        cy.get("@tags").should("contain", "spaß");
    });

    /*it("should get newsletter", () => {
        cy.visit("https://javascript-days.de/muenchen/");
        cy.contains("Alle akzeptieren").click();
        cy.contains("Newsletter bestellen").click();
    });*/
});
