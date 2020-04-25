import * as m from 'mithril';
import { Pagination } from './components/pagination';
import { List } from './List';
import { AppModel } from './app.model';
import { lists } from './db';

const defaultCurrent = 1;
const defaultPageSize = 3;

export const App = {
  oninit: function() {
    AppModel.setLists(defaultCurrent, defaultPageSize);
  },
  view: function() {
    return m('#app', [
      m(List, {
        dataSource: AppModel.lists
      }),
      m(Pagination, {
        defaultCurrent, // 默认当前页码
        defaultPageSize, // 默认每页大小
        total: lists.length, // 数据总数
        onChange: function(current) { // 页码改变
          AppModel.setLists(current, defaultPageSize);
        }
      })
    ]);
  }
};