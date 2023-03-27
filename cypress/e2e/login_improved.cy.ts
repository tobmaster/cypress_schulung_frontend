import { delayLogin } from "../helper/delay";
import { loginByUI } from "./loginByUI";

describe('Login', () => {

    beforeEach(() => {
        cy.loginByUI('testuser@example.com', 'password');
    });

    it('should be possible to login', () => {

        cy.get('[data-testid="your-feed"]').should('have.class', 'active');


        /** Here **/
        cy.get('[data-testid=article-preview]').eq(1).as('article'); //alias

        cy.get('@article')
            .find('.tag-list > .tag-pill')
            .as('tags')

        cy.get('@article')
            .find('.preview-link')
            .contains('END-TO-END TESTING THE EASY WAY');

        cy.get('@tags').eq(0)
            .should('contain', 'cypress');
        cy.get('@tags').eq(1)
            .should('contain', 'e2e');
        cy.get('@tags').eq(2)
            .should('contain', 'testing');
    })
})