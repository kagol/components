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

  centerPages = [];

  centerSize = 5; // 中间的页数，默认为5

  // 以下字段均基于 centerSize 计算而来
  sideSize = (this.centerSize - 1) / 2;
  jumpSize = this.centerSize;
  startEllipsisSize = this.centerSize + 3;
  maxLeftSize = this.centerSize + 1;

  ngOnInit() {
    this.pages = Object.entries(generatePages(this.totalPage));
    this.updateCenterPage();
  }

  updateCenterPage() {
    let centerPage = this.current;
    if (this.current > this.pages.length - 3) {
      centerPage = this.pages.length - 3;
    }
    if (this.current < 4) {
      centerPage = 4;
    }
    if (this.pages.length <= this.startEllipsisSize) {
      const centerPage = [];
      for (let i = 2, len = this.pages.length; i < len; i++) {
        centerPage.push(i);
      }
      this.centerPages = centerPage;
    } else {
      this.centerPages = [centerPage - 2, centerPage - 1, centerPage, centerPage + 1, centerPage + 2 ];
    }
  }

  clickPage($event, page) {
    this.current = page;
    this.updateCenterPage();
    this.onChange.emit(this.current);
  }

  leftMorePage() {
    let newPage = this.current - this.jumpSize;
    if (newPage < 1) {
      newPage = 1;
    }
    this.current = newPage;
    this.updateCenterPage();
    this.onChange.emit(this.current);
  }

  rightMorePage() {
    let newPage = this.current + this.jumpSize;
    if (newPage > this.pages.length) {
      newPage = this.pages.length;
    }
    this.current = newPage;
    this.updateCenterPage();
    this.onChange.emit(this.current);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultCurrent && changes.defaultCurrent.currentValue) {
      this.current = changes.defaultCurrent.currentValue;

      this.pages = Object.entries(generatePages(this.totalPage));
      this.updateCenterPage();
    }
  }
}