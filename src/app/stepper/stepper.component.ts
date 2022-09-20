import { Component, Input } from "@angular/core";

@Component({
  selector: "app-stepper",
  template: `<div>
    <button aria-label="decrement" (click)="decrement()">-</button>
    <span data-cy="counter">{{ count }}</span>
    <button aria-label="increment" (click)="increment()">+</button>
  </div>`,
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
