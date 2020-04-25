<template>
  <ul class="m-pager">
    <li v-for="pageItem in pageList" :key="pageItem[0]" 
      class="number" v-bind:class="{ active: pageItem[0] == current }"
      v-on:click="clickPage(pageItem[0])">
      {{ pageItem[1].label }}
    </li>
  </ul>
</template>

<script>

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
