<template>
  <div class="center">
    <!-- 模板中的某个位置，无法确定内容 -->
    <!-- 插槽 -->
    <slot>默认值</slot>
  </div>
</template>

<style scoped>
.center {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
