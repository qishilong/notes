<template>
  <div>
    <h1>我是Home页面</h1>
    <div>欢迎，{{ name }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['name']),
  },
  created() {
    this.$store.dispatch('getName');
  },
  asyncData(store) {
    return store.dispatch('getName');
  }
}
</script>

<style>

</style>