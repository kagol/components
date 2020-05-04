import { Component, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";

@Component({
  selector: 'd-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() totalPage: number;
  @Input() defaultCurrent: number;
  @Output() onChange = new EventEmitter();

  @Input()
  get centerPages() {
    let centerPage = this.current;
    if (this.current > this.totalPage - 3) {
      centerPage = this.totalPage - 3;
    }
    if (this.current < 4) {
      centerPage = 4;
    }
    const centerArr = [];
    if (this.totalPage < this.centerSize + 2) {
      for (let i = 2; i < this.totalPage; i++) {
        centerArr.push(i);
      }
    } else {
      for (let i = centerPage - 2; i <= centerPage + 2; i++) {
        centerArr.push(i);
      }
    }
    return centerArr;
  }

  current = this.defaultCurrent;
  centerSize = 5; // 中间的页数，默认为5
  jumpSize = 5;

  setPage($event, page) {
    let newPage = page;
    if (page < 1) newPage = 1;
    if (newPage > this.totalPage) newPage = this.totalPage;
    this.current = newPage;
    this.onChange.emit(this.current);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultCurrent && changes.defaultCurrent.currentValue) {
      this.current = changes.defaultCurrent.currentValue;
    }
  }
}