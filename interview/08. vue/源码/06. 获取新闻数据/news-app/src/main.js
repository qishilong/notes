import Vue from "vue";
import App from "./App.vue";
import "./assets/style/reset.css";
import "./assets/style/global.css";
import { getNewsChannels, getNews } from "./services/newsService";

// 第一种使用方式
// getNewsChannels().then((resp) => {
//   console.log(resp);
// });

// 第二种使用方式
// async function test() {
//   var resp = await getNewsChannels();
//   console.log(resp);
// }

// test();

// 第一种使用方式
// getNews("5572a108b3cdc86cf39001cd", 2, 5).then((resp) => {
//   console.log(resp);
// });

// 第二种使用方式
async function test() {
  var resp = await getNews("5572a108b3cdc86cf39001cd", 2, 5);
  console.log(resp);
}
test();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
