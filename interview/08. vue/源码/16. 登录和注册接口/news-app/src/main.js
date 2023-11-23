import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.css";
import "./assets/style/global.css";
import router from "./routes";
import store from "./store";

import { login, whoAmI, loginOut, reg } from "./services/userService";

async function test() {
  // loginOut();
  // var resp = await whoAmI();
  // console.log(resp);

  // var resp = await reg({
  //   loginId: "user2",
  //   loginPwd: "1231231123",
  //   nickname: "哈哈哈",
  // });
  // console.log(resp);
  var resp = await login({
    loginId: "user2",
    loginPwd: "12312311323",
  });
  console.log(resp);
}
test();

// 频道数据一开始就需要获取
store.dispatch("channels/fetchDatas");

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
