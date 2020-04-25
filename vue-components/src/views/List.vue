<template>
  <ul class="m-list">
    <li v-for="list in dataSource" :key="list.id">
      {{ list.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    dataSource: {
      type: Array
    }
  },
  watch: {
    dataSource: {
      handler(newValue, oldValue) {
        this.dataSource = newValue;
      }
    }
  }
};
</script>
