import { chunk } from "./util";
import { lists } from './db';

export const AppModel = {
  lists: [],
  setLists: function(page, pageSize) {
    AppModel.lists = chunk(lists, pageSize)[page - 1];
  }
};