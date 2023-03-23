export const delayLogin = (timedelay = 4100) => {
    cy.log("DELAYED LOGIN", timedelay);

    cy.intercept({ url: "**/api/users/login", middleware: true }, (req) => {
        req.on("response", (res) => {
            res.setDelay(timedelay);
        });
    });
};
