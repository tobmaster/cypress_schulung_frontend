/// <reference types="Cypress" />

describe('Feed', () => {

    beforeEach(() => {
        cy.loginTestUser();
        cy.visit('/');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })

    it('should show proper "Your Feed"', () => {
        cy.contains('Your Feed');
    })
});