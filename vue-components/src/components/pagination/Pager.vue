<template>
  <ul class="x-pager">
    <li 
      class="number" 
      :class="{ active: this.current == 1 }" 
      @click="setPage(1)"
    >1</li>

    <li class="more left"></li>
    <li class="number"></li>
    <li class="more right"></li>
    
    <li 
      class="number" 
      :class="{ active: this.current == totalPage }"
      v-if="totalPage !== 1" 
      @click="setPage(totalPage)"
    >{{ totalPage }}</li>
  </ul>
</template>

<script>
import Vue from 'vue';
import { generatePages } from '@/util';

export default {
  name: 'Pager',
  props: {
    totalPage: Number,
    defaultCurrent: Number,
  },
  data() {
    return {
      current: this.defaultCurrent,
      pages: generatePages(this.totalPage),
    }
  },
  watch: {
    defaultCurrent: {
      handler(newValue, oldValue) {
        this.current = newValue;
      }
    }
  },
  methods: {
    setPage(page) {
      this.current = page;
      this.$emit('change', this.current);
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/common.scss';

.x-pager {
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
