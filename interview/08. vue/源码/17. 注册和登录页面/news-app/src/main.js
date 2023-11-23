import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.css";
import "./assets/style/global.css";
import router from "./routes";
import store from "./store";

// 频道数据一开始就需要获取
store.dispatch("channels/fetchDatas");

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
