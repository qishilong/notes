<template>
  <Logo></Logo>
  <Header>猫眼电影</Header>
  <p>我的页面</p>
  <Footer :categoryNum="5"></Footer>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Logo,
  },
};
</script>

<style>
p {
  font-size: 0.4rem;
  margin: 0.3rem;
}
</style>
