import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.css";
import "./assets/style/global.css";
import router from "./routes"

new Vue({
  render: (h) => h(App),
  router, // 3. 配置路由到vue实例中
}).$mount("#app");
