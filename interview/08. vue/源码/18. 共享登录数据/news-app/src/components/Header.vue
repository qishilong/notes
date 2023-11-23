<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <!-- 声明式导航 -->
          <router-link :to="{ name: 'Home' }">
            <img src="../assets/logo.png" alt="" />
          </router-link>
        </div>
        <ul class="nav">
          <li><router-link :to="{ name: 'Home' }">首页</router-link></li>
          <li v-if="isLoading">loading...</li>
          <li v-for="item in data.slice(0, 5)" :key="item.channelId">
            <router-link
              :to="{
                name: 'ChannelNews',
                params: {
                  id: item.channelId,
                },
              }"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
        <div class="user">
          <!-- 情况1：正在远程加载中 -->
          <span v-if="isLogining">loading...</span>
          <!-- 情况2：当前有登录用户 -->
          <template v-else-if="loginUser">
            <a href="">{{ loginUser.nickname }}</a>
            <a href="" @click.prevent="handleLoginOut">退出登录</a>
          </template>
          <template v-else>
            <router-link :to="{ name: 'Login' }">登录</router-link>
            <router-link :to="{ name: 'Reg' }">注册</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("channels", ["data", "isLoading"]), // {data(){}, isLoading(){}}
    ...mapState("loginUser", {
      loginUser: "data",
      isLogining: "isLoading",
    }), // {loginUser(){}, isLogging(){}}
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch("loginUser/loginOut");
      this.$router.push({ name: "Login" });
    },
  },
};
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
