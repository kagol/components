import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'd-pagination',
  template: `
    <div>
      <d-button class="btn-prev" (btnClick)="prevPage()">&lt;</d-button>
      <d-pager [totalPage]="totalPage" [defaultCurrent]="defaultCurrent" (onChange)="onPageChange"></d-pager>
      <d-button class="btn-next" (btnClick)="nextPage()">></d-button>
    </div>
  `,
})
export class PaginationComponent {
  @Input() total: number;
  @Input() defaultCurrent = 1;
  @Input() defaultPageSize: number;
  @Output() onChange = new EventEmitter();

  @Input()
  get totalPage() {
    return Math.ceil(this.total / this.defaultPageSize);
  }

  current = 1;

  prevPage() {
    if (this.current < 2) return;
    this.current--;
    this.onChange.emit(this.current);
  }

  nextPage() {
    if (this.current > this.totalPage - 1) return;
    this.current++;
    this.onChange.emit(this.current);
  }

  onPageChange() {

  }
}
