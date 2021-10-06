/// <reference types="Cypress" />

describe('Feed', () => {

    beforeEach(() => {
        cy.loginByUI();
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })
});