import { StepperComponent } from "./stepper.component"

const counterSelector = '[data-cy="counter"]';
const incrementSelector = '[aria-label="increment"]';
const decrementSelector = '[aria-label="decrement"]';

describe('StepperComponent',()=>{
    it('mount',()=> {
        cy.mount(StepperComponent);
    })
    
    it("should default to 0", ()=> {
        cy.mount(StepperComponent);
        cy.get(counterSelector).should('have.text','0');
    })

    it("should increase", ()=>{
        cy.mount(StepperComponent);
        cy.get(incrementSelector).click();
        cy.get(incrementSelector).click();
        cy.get(incrementSelector).click();
        cy.get(incrementSelector).click();
        cy.get(counterSelector).should('have.text', 4)
    })
})