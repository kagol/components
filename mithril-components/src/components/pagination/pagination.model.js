export const PagerModel = {
  pages: {},
  setPage: function(pageKey) {
    for (let page in PagerModel.pages) {
      PagerModel.pages[page].active = false;
    }
    PagerModel.pages[pageKey].active = true;
  },
  getCurrent: function() {
    return +Object.entries(PagerModel.pages).filter(pageItem => pageItem[1].active)[0][0];
  },
};