<template>
<div class="header">
  <div class="header-container">
    <div class="container">
      <div class="logo">
        <a href="">
          <img src="../assets/logo.png" alt="">
        </a>
      </div>
      <ul class="nav">
        <li><a href="">首页</a></li>
        <li><a href="">Quod?</a></li>
        <li><a href="">Iusto!</a></li>
        <li><a href="">Laboriosam.</a></li>
        <li><a href="">Maxime?</a></li>
      </ul>
      <div class="user">
        <a href="">登录</a>
        <a href="">注册</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  height: 60px;
}
.header-container {
  height: 60px;
  background: #000;
  color: #fff;
  line-height: 60px;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
}
.container {
  display: flex;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 42px;
  height: 42px;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
}
.nav a {
  display: block;
  padding: 0 30px;
}
.nav .router-link-exact-active {
  color: #fcb85f;
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #fff;
}
</style>
