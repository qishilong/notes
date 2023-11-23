<template>
  <header>
    <a v-if="backBtn" href="#" class="backBtn"></a>
    <slot></slot>
    <button v-if="burgerBtn"></button>
  </header>
</template>

<script>
export default {
  name: "Header",
  props : {
    backBtn : {
      type : Boolean,
      default : false
    },
    burgerBtn : {
      type : Boolean,
      default : true
    }
  }
};
</script>

<style scoped>
header {
  height: 1.38rem;
  background-color: #e64a48;
  position: relative;
  text-align: center;
  line-height: 1.38rem;
  font-size: 0.5rem;
  color: #fff;
  font-weight: 300;
  border-bottom: 0.01rem solid #e7e9e1;
}
header > button {
  position: absolute;
  right: 0.3rem;
  top: calc(50% - 0.23rem);
  display: block;
  width: 0.5rem;
  height: 0.46rem;
  background: url("@/assets/img/hamburger.png") center/cover no-repeat;
}
header>.backBtn {
    position: absolute;
    left: .3rem;
    top: calc(50% - .15rem);
    width: .3rem;
    height: .3rem;
    border-top: .06rem solid #fff;
    border-left: .06rem solid #fff;
    transform: rotate(-45deg);
    user-select: none;
}
</style>
