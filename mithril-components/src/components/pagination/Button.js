import * as m from 'mithril';

export const Button = {
  view: function(vnode) {
    return m('button[type=button]', {
      class: vnode.attrs.class,
      onclick: function() {
        vnode.attrs.onClick();
      }
    }, vnode.children[0]);
  }
};