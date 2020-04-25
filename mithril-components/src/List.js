import * as m from 'mithril';

export const List = {
  view: function(vnode) {
    const lists = vnode.attrs.dataSource.map(list => {
      return m('li', list.name);
    });
    return m('ul.m-list', lists);
  }
};