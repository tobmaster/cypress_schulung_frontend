import { Component, Input } from "@angular/core";

@Component({
  selector: "app-stepper",
  template: `<div class="cookielayer">ALL YOUR DATA BELONGS TO US</div> <div>
    <button aria-label="decrement" (click)="decrement()">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" (click)="increment()">+</button>
  </div>`,
  /*styles: [
    `
      .cookielayer {
        position: absolute;
        background-color: red;
        color: white;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    `
  ]*/
})
export class StepperComponent {
  @Input() count = 0;

  decrement(): void {
    this.count--;
  }

  increment(): void {
    this.count++;
  }
}
