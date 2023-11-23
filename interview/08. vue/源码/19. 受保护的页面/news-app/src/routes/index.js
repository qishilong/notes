import VueRouter from "vue-router";
import Vue from "vue";
import config from "./config";
import store from "../store";

//1. 安装
Vue.use(VueRouter);

//2. 创建路由对象
var router = new VueRouter(config);

router.beforeEach(function(to, from, next) {
  if (to.meta.auth) {
    // 需要登录才能访问
    if (store.state.loginUser.isLoading) {
      next({ name: "Auth", query: { returnurl: to.fullPath } });
    } else if (store.state.loginUser.data) {
      next(); //允许进入
    } else {
      next({ name: "Login" });
    }
  } else {
    // 都可以访问
    next();
  }
});

export default router;
