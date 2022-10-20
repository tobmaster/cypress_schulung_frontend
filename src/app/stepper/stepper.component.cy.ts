import { StepperComponent } from "./stepper.component"

const counterSelector = '[data-cy="counter"]';
const incrementSelector =  '[aria-label="increment"]'
const decrementSelector =  '[aria-label="decrement"]'

describe('StepperComponent', ()=>{
    it("mounts",()=>{
        cy.mount(StepperComponent);
    })

    it("should default to 0", ()=> {
        cy.mount(StepperComponent);
        cy.get(counterSelector).should('have.text','0');
    })

    it.only("should increase", ()=> {
        cy.mount(StepperComponent);
        cy.get(incrementSelector).click();
        cy.get(incrementSelector).click();
        cy.get(incrementSelector).click();
        cy.get(counterSelector).should('have.text','3');
    })

    it.only("should decrease", ()=> {
        cy.mount(StepperComponent);
        cy.get(decrementSelector).click();
        cy.get(decrementSelector).click();
        cy.get(decrementSelector).click();
        cy.get(counterSelector).should('have.text','-3');
    })

})