import { Component, Input } from "@angular/core";

@Component({
  selector: 'd-list',
  template: `
    <ul class="m-list">
      <li *ngFor="let list of dataSource">
        {{ list.name }}
      </li>
    </ul>
  `,
})
export class ListComponent {
  @Input() dataSource;
}