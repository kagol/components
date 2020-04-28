<template>
  <div class="m-pagination">
    <Button class="btn-prev" v-on:click="prevPage">&lt;</Button>
    <Pager v-bind:total-page="totalPage" v-bind:default-current="current" v-on:change="onChange"></Pager>
    <Button class="btn-next" v-on:click="nextPage">></Button>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from './Button.vue';
import Pager from './Pager.vue';

export default {
  name: 'Pagination',
  components: {
    Button,
    Pager,
  },
  // 接口定义 props
  props: {
    defaultCurrent: {
      type: Number,
      // default: 2
    },
    defaultPageSize: {
      type: Number,
      // default: 3
    },
    total: {
      type: Number,
      // default: 24
    },
  },
  data() {
    return {
      current: this.defaultCurrent,
      pageSize: this.defaultPageSize,
    }
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  methods: {
    prevPage() {
      if (this.current < 2) return;
      this.current--;
      this.$emit('change', this.current);
    },
    nextPage() {
      if (this.current > this.totalPage - 1) return;
      this.current++;
      this.$emit('change', this.current);
    },
    onChange(current) {
      this.current = current;
      this.$emit('change', this.current);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/common.scss';

.m-pagination {
  display: flex;
  align-items: center;
  .btn-prev, .btn-next {
    @include page-button;
    border: none;
  }
}
</style>
