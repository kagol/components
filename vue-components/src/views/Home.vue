<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App by kagol"/>
    <List :data-source="dataSource" />
    <Pagination :default-current="defaultCurrent" :default-page-size="pageSize" :total="total" @change="onChange" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import List from './List.vue';
import { lists } from '@/db';
import { chunk } from '@/util';

export default {
  name: 'home',
  components: {
    HelloWorld,
    Pagination,
    List,
  },
  data() {
    return {
      defaultCurrent: 1,
      pageSize: 2,
      total: lists.length,
      dataSource: [],
    }
  },
  created() {
    this.dataSource = chunk(lists, this.pageSize)[this.defaultCurrent - 1];
  },
  methods: {
    onChange(current) {
      this.setLists(current, this.pageSize);
    },
    setLists: function(page, pageSize) {
      this.dataSource = chunk(lists, pageSize)[page - 1];
    }
  }
};
</script>
