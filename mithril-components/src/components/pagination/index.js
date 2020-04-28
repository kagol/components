import * as m from 'mithril';
import { Pager } from './Pager';
import { Button } from './Button';
import { PagerModel } from './pagination.model';
import { generatePages } from '../../util';

export const Pagination = {
  oninit: function(vnode) {
    // 接口定义 vnode.attrs
    const { total, defaultPageSize, defaultCurrent } = vnode.attrs;
    PagerModel.pages = generatePages(total, defaultPageSize);
    PagerModel.setPage(defaultCurrent || 1);
  },
  view: function(vnode) {
    return m('.m-pagination', [
      m(Button, {
        class: 'btn-prev',
        onClick: function() {
          const current = PagerModel.getCurrent();
          if (current < 2) return;
          PagerModel.setPage(current - 1);

          // 向组件外发射事件
          vnode.attrs.onChange(current - 1);
        }
      }, '<'),
      m(Pager, {
        defaultCurrent: vnode.attrs.defaultCurrent,
        total: vnode.attrs.total,
        defaultPageSize: vnode.attrs.defaultPageSize,
        onChange: vnode.attrs.onChange,
      }),
      m(Button, {
        class: 'btn-next',
        onClick: function() {
          const current = PagerModel.getCurrent();
          const size = Object.keys(PagerModel.pages).length;
          if (current > size - 1) return;
          PagerModel.setPage(current + 1);
          
          // 向组件外发射事件
          vnode.attrs.onChange(current + 1);
        }
      }, '>'),
    ]);
  }
};