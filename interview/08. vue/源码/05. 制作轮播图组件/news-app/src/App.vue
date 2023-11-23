<template>
  <div id="app">
    <div v-if="show" style="width:1080px; margin:0 auto">
      <Banner :banners="banners" :duration="4000" />
    </div>
    <button @click="show=!show">切换显示</button>
  </div>
</template>

<script>
import Banner from "./components/Banner";
export default {
  components: {
    Banner,
  },
  data() {
    return {
      banners: [
        {
          url: require("./assets/banner/banner1.jpeg"),
          link: "https://duyi.ke.qq.com",
        },
        {
          url: require("./assets/banner/banner2.jpeg"),
          link: "https://duyi.ke.qq.com",
        },
        {
          url: require("./assets/banner/banner3.jpeg"),
          link: "https://duyi.ke.qq.com",
        },
      ],
      show: true,
    };
  },
};
</script>
