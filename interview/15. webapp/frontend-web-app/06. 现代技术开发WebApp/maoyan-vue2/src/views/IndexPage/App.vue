<template>
  <div class="header">
    <Header>猫眼电影</Header>
    <Logo></Logo>
  </div>
  <SPAContent :nav="nav" :width="6.2"></SPAContent>
  <Footer :categoryNum="1"></Footer>
</template>

<script>
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SPAContent from "@/components/SPAContent";
export default {
  name: "App",
  components: {
    Header,
    Logo,
    Footer,
    SPAContent,
  },
  setup() {
    return {
      nav: [
        {
          name: "热映",
          path: "/",
        },
        {
          name: "影院",
          path: "/theater",
        },
        {
          name: "待映",
          path: "/willComing",
        },
        {
          name: "经典电影",
          path: "/classicMovie",
        },
      ],
    };
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #fff;
}
</style>
