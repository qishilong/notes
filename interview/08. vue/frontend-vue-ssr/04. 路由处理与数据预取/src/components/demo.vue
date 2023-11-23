<template>
  <div>
    <input type="text" v-model="val">
    <p>输入框中的内容为：{{val}}</p>
    <div class="button" @click="show">click me</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 'SSR'
    }
  },
  methods: {
    show() {
      alert(this.val);
    }
  }
}
</script>

<style scoped>
  .button {
    width: 100px;
    height: 100px;
    background: #fac;
    text-align: center;
    line-height: 100px;
  }
</style>