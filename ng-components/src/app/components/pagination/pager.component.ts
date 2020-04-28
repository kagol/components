import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'd-pager',
  template: `
    <div>Pager</div>
  `,
})
export class PagerComponent {
  @Input() totalPage: number;
  @Input() defaultCurrent = 1;
  @Output() onChange = new EventEmitter();
}