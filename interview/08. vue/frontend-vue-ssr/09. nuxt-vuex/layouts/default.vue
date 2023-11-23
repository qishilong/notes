<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header class="layout" :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <nuxt-link to="/home">首页</nuxt-link>
      <nuxt-link to="/about">关于</nuxt-link>
      <nuxt-link to="login" v-if="!isLogin">登录</nuxt-link>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '84px', height: '80vh' }">
      <nuxt/>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.layout .nuxt-link-active {
  color: #fff;
}
.layout a {
  color: #40a9ff;
}
</style>
