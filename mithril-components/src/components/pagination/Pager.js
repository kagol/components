import * as m from 'mithril';
import { PagerModel } from './pagination.model';
import { generatePages } from '../../util';

const centerSize = 5; // 中间的页数，默认为5

// 以下字段均基于 centerSize 计算而来
const sideSize = (centerSize - 1) / 2;
const jumpSize = centerSize;
const startEllipsisSize = centerSize + 3;
const maxLeftSize = centerSize + 1;

export const Pager = {
  // oninit: function(vnode) {
  //   const { total, defaultPageSize, defaultCurrent } = vnode.attrs;
  //   PagerModel.pages = generatePages(total, defaultPageSize);
  //   PagerModel.setPage(defaultCurrent || 1);
  // },
  view: function(vnode) {
    const pageList = Object.entries(PagerModel.pages);
    const current = PagerModel.getCurrent();
    
    const pages = [];
    let noLeftMore = true;
    let noRightMore = true;
    for (let pageIndex = 0, pageLen = pageList.length; pageIndex < pageLen; pageIndex++) {
      const pageItem = pageList[pageIndex];
      const [ pageKey, page ] = pageItem;

      const normalPage = m(`li${page.active ? '.active' : ''}`, {
        class: 'number',
        onclick: function() {
          PagerModel.setPage(pageKey);
          // 向组件外发射事件
          vnode.attrs.onChange(pageKey);
        },
      }, page.label);

      const leftMorePage = m('li', {
        class: 'more left',
        onclick: function() {
          let newPage = current - jumpSize;
          if (newPage < 1) {
            newPage = 1;
          }
          PagerModel.setPage(newPage);
          // 向组件外发射事件
          vnode.attrs.onChange(newPage);
        },
      });

      const rightMorePage = m('li', {
        class: 'more right',
        onclick: function() {
          let newPage = current + jumpSize;
          if (newPage > pageList.length) {
            newPage = pageList.length;
          }
          PagerModel.setPage(newPage);
          // 向组件外发射事件
          vnode.attrs.onChange(newPage);
        },
      });

      if (pageList.length < startEllipsisSize) {
        // console.log(`总页数 < ${startEllipsisSize}`);
        pages.push(normalPage);
      } else {
        // console.log(`总页数 >= ${startEllipsisSize}`);
        if (current < centerSize) {
          // console.log(`当前页码 < ${centerSize}`);
          if (pageIndex === pageList.length - 1 || pageIndex < maxLeftSize) {
            pages.push(normalPage);
          } else {
            noRightMore && pages.push(rightMorePage);
            noRightMore = false;
          }
        } else if (current > pageList.length - centerSize + 1) {
          // console.log(`当前页码 > ${pageList.length - centerSize + 1}`);
          if (pageIndex === 0 || pageIndex > pageList.length - 1 - maxLeftSize) {
            pages.push(normalPage);
          } else {
            noLeftMore && pages.push(leftMorePage);
            noLeftMore = false;
          }
        } else {
          // console.log(`${pageIndex + 1 - sideSize} <= 当前页码 <= ${pageIndex + 1 + sideSize}`);
          // console.log(`或者 当前页码 = 1（首页）`);
          // console.log(`或者 当前页码 = ${pageList.length}（尾页）`);
          if (pageIndex === 0 || pageIndex === pageList.length - 1) {
            pages.push(normalPage);
          } else if (pageIndex > 0 && pageIndex < current - sideSize - 1) {
            noLeftMore && pages.push(leftMorePage);
            noLeftMore = false;
          } else if (pageIndex >= current - sideSize - 1 && pageIndex <= current + sideSize - 1) {
            pages.push(normalPage);
          } else if (pageIndex > current + sideSize - 1 && pageIndex < pageList.length - 1) {
            noRightMore && pages.push(rightMorePage);
            noRightMore = false;
          } else {
            pages.push(normalPage);
          }
        }
      }
    }

    return m('ul.m-pager', pages);
  }
};