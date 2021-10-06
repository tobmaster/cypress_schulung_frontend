/// <reference types="Cypress" />
import { delayLogin } from '../helper/delay';
import login from '../helper/login';

describe('Login', () => {

    beforeEach(() => {
        //delayLogin();
        login();
    })

    it('should navigate to the login', () => {
        cy.contains('Global Feed').click();

        cy.get('[data-testid=article-preview]')
            .eq(1)
            .find('h1').should('contain', 'End-To-End Testing leichtgemacht');

        cy.get('[data-testid=article-preview]')
            .eq(1)
            .find('.tag-list > .tag-pill')
            .as('tags');

        cy.get('@tags').eq(0).should('contain', 'e2e');
        cy.get('@tags').eq(1).should('contain', 'testing');
        cy.get('@tags').eq(2).should('contain', 'cypress');

        /*
        cy.get('@tags').eq(2).screenshot('filename')
        cy.contains('.nav-item', 'Your Feed')
            .find('.nav-link')
            .should('have.class', 'active');*/

    })

});