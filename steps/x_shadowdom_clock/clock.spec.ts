
describe('toaser', () => {

    it('should toast', () =>  {
        
        cy.visit('http://localhost:3333/');

        
        cy.get('tasty-toaster').shadow()
            .as('toaster');

        cy.get('@toaster')
            .find('[name=crispiness]')
            .invoke("val", 3)
            .trigger("change");

      //  cy.clock();
        cy.get('@toaster')
            .find('.toaster .handle')
            .click();
            
      //  cy.tick(10000);

        cy.get('@toaster')
            .find('.toasts .toast')
            .eq(0, {timeout: 9000})
            .should('have.class','toasted');

        /*cy.clock().then((clock) => {
            clock.restore()
        })*/

        cy.get('@toaster')
            .find('.toaster .handle')
            .click();

      //  cy.tick(10000);

        cy.get('@toaster')
            .find('.fire .particle').should('have.length.gt', 1);

    })

});