<template>
  <div>
    <div>url: {{ error.path }}</div>
    <div>code: {{ error.statusCode }}</div>
    <div>msg: {{ error.message }}</div>
    <nuxt-link to="/">返回首页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style>
</style>
