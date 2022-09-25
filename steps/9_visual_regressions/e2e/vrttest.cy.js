describe("Visual Regression Tests", () => {
  it(`Cypress website should look the same`, function () {
    cy.vrtStart();

    cy.visit("https://www.cypress.io/");

    cy.contains("Accept Cookies").click();
    cy.get("#onetrust-banner-sdk").should("not.be.visible");

    cy.vrtTrack("Cypress Home page", {
      capture: "viewport",
      blackout: [".HeroEpilogue-Promo"],
    });

    cy.fixture("test.png").then((logo) => {
      cy.vrtTrackBase64("Cypress Fixture image", logo);
    });

    cy.vrtStop();
  });

  it(`should check local image`, () => {
    cy.vrtStart();

    /*
    Mock before image to change the result
    cy.intercept("https://tobmaster.github.io/workshop-startpage/before.jpg", {
      fixture: "after.jpg",
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=0",
      },
    });
    */
    cy.visit("https://tobmaster.github.io/workshop-startpage/vrt.html");

    cy.vrtTrack("searchimage");

    cy.vrtStop();
  });
});
