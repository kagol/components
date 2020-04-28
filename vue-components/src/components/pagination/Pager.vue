<script>
import Vue from 'vue';
import { generatePages } from '@/util';

export default {
  name: 'Pager',
  components: {
  },
  props: {
    totalPage: {
      type: Number,
      // default: 2
    },
    defaultCurrent: {
      type: Number,
    }
  },
  data() {
    return {
      pages: generatePages(this.totalPage),
      current: this.defaultCurrent,
    }
  },
  computed: {
    pageList: function() {
      return Object.entries(this.pages)
    },
  },
  watch: {
    defaultCurrent: {
      handler(newValue, oldValue) {
        this.current = newValue;
      }
    }
  },
  methods: {
    setPage(pageKey) {
      for (let page in this.pages) {
        this.pages[page].active = false;
      }
      this.pages[pageKey].active = true;
    },
    getCurrent() {
      const activePage = Object.entries(this.pages).filter(pageItem => pageItem[1].active);
      if (activePage && activePage.length !== 0) {
        return +activePage[0][0];
      }
      return 0;
    },
    clickPage(pageKey) {
      this.setPage(pageKey);
      this.current = pageKey;
      this.$emit('change', this.getCurrent());
    }
  },
  render(createElement) {
      const centerSize = 5; // 中间的页数，默认为5

      // 以下字段均基于 centerSize 计算而来
      const sideSize = (centerSize - 1) / 2;
      const jumpSize = centerSize;
      const startEllipsisSize = centerSize + 3;
      const maxLeftSize = centerSize + 1;

      const pages = [];
      let noLeftMore = true;
      let noRightMore = true;
      for (let pageIndex = 0, pageLen = this.pageList.length; pageIndex < pageLen; pageIndex++) {
        const pageItem = this.pageList[pageIndex];
        const [ pageKey, page ] = pageItem;

        const normalPage = createElement('li', {
          class: {
            number: true,
            active: pageKey == this.current
          },
          on: {
            click: () => { 
              this.clickPage(pageKey); 
            }
          }
        }, page.label);

        const leftMorePage = createElement('li', {
          class: {
            more: true,
            left: true
          },
          on: {
            click: () => { 
              let newPage = this.current - jumpSize;
              if (newPage < 1) {
                newPage = 1;
              }
              this.clickPage(newPage); 
            }
          }
        });

        const rightMorePage = createElement('li', {
          class: {
            more: true,
            right: true
          },
          on: {
            click: () => { 
              let newPage = this.current + jumpSize;
              if (newPage > this.pageList.length) {
                newPage = this.pageList.length;
              }
              this.clickPage(newPage);
            }
          }
        });

        if (this.pageList.length < startEllipsisSize) {
          // console.log(`总页数 < ${startEllipsisSize}`);
          pages.push(normalPage);
        } else {
          // console.log(`总页数 >= ${startEllipsisSize}`);
          if (this.current < centerSize) {
            // console.log(`当前页码 < ${centerSize}`);
            if (pageIndex === this.pageList.length - 1 || pageIndex < maxLeftSize) {
              pages.push(normalPage);
            } else {
              noRightMore && pages.push(rightMorePage);
              noRightMore = false;
            }
          } else if (this.current > this.pageList.length - centerSize + 1) {
            // console.log(`当前页码 > ${this.pageList.length - centerSize + 1}`);
            if (pageIndex === 0 || pageIndex > this.pageList.length - 1 - maxLeftSize) {
              pages.push(normalPage);
            } else {
              noLeftMore && pages.push(leftMorePage);
              noLeftMore = false;
            }
          } else {
            // console.log(`${pageIndex + 1 - sideSize} <= 当前页码 <= ${pageIndex + 1 + sideSize}`);
            // console.log(`或者 当前页码 = 1（首页）`);
            // console.log(`或者 当前页码 = ${pageList.length}（尾页）`);
            if (pageIndex === 0 || pageIndex === this.pageList.length - 1) {
              pages.push(normalPage);
            } else if (pageIndex > 0 && pageIndex < this.current - sideSize - 1) {
              noLeftMore && pages.push(leftMorePage);
              noLeftMore = false;
            } else if (pageIndex >= this.current - sideSize - 1 && pageIndex <= this.current + sideSize - 1) {
              pages.push(normalPage);
            } else if (pageIndex > this.current + sideSize - 1 && pageIndex < this.pageList.length - 1) {
              noRightMore && pages.push(rightMorePage);
              noRightMore = false;
            } else {
              pages.push(normalPage);
            }
          }
        }
      }
      return createElement('ul', {
        class: {
          'm-pager': true
        }
      }, pages);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/common.scss';

.m-pager {
  list-style: none;
  padding: 0;
  li {
    @include page-button;

    &.active {
      background-color: $blue;
      color: #fff;
      cursor: default;
    }

    &:not(.active):hover {
      color: $blue;
    }

    &.more {
      &::before {
        content: '...';
      }
      &.left:hover::before {
        content: '<<';
      }
      &.right:hover::before {
        content: '>>';
      }
    }
  }
}
</style>
