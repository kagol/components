import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'd-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() total: number;
  @Input() defaultCurrent = 1;
  @Input() defaultPageSize: number;
  @Output() onChange = new EventEmitter();

  @Input()
  get totalPage() {
    console.log('this.total, this.defaultPageSize:', this.total, this.defaultPageSize);
    console.log('totalPage:', Math.ceil(this.total / this.defaultPageSize));
    return Math.ceil(this.total / this.defaultPageSize);
  }

  current = this.defaultCurrent;

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

  onPageChange(current) {
    this.current = current;
    this.onChange.emit(this.current);
  }
}
