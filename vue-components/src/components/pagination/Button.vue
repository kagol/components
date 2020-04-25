<template>
  <button type="button" v-on:click="onClick"><slot></slot></button>
</template>

<script>
export default {
  name: 'Button',
  components: {
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>
