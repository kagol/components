import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from "@angular/core";
import { generatePages } from 'src/app/util';

@Component({
  selector: 'd-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalPage: number;
  @Input() defaultCurrent = 1;
  @Output() onChange = new EventEmitter();

  pages;
  current = this.defaultCurrent;

  ngOnInit() {
    this.pages = Object.entries(generatePages(this.totalPage));
  }

  clickPage($event, pageItem) {
    const [ pageKey, page ] = pageItem;
    this.current = pageKey;
    this.onChange.emit(this.current);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultCurrent && changes.defaultCurrent.currentValue) {
      this.current = changes.defaultCurrent.currentValue;
    }
  }
}