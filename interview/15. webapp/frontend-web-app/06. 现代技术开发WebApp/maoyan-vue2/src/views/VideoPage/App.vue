<template>
  <div class="header">
    <Logo></Logo>
    <Header>猫眼电影</Header>
  </div>
  <!-- 单页部分内容 -->
  <SPAContent :nav="nav" :city="false" :search="false"></SPAContent>
  <Footer :categoryNum="2"></Footer>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import SPAContent from "@/components/SPAContent";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Logo,
    SPAContent,
  },
  setup(props) {
    return {
      nav: [
        {
          name: "推荐",
          path: "/video",
        },
        {
          name: "预告片",
          path: "/video/trailer",
        },
        {
          name: "热片解读",
          path: "/video/interpretation",
        },
        {
          name: "说电影",
          path: "/video/commentary",
        },
        {
          name: "娱乐",
          path: "/video/entertainment",
        },
      ],
    };
  },
};
</script>

<style>
p {
  font-size: 0.4rem;
  margin: 0.3rem;
}
.header {
  width: 100%;
  height: 2.98rem;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #fff;
}
</style>
