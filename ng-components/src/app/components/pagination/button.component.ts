import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'd-button',
  template: `
    <button type="button" (click)="onClick()"><ng-content></ng-content></button>
  `,
})
export class ButtonComponent {
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}