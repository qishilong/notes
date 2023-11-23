<template>
  <!-- 整个分为两个部分 -->
  <!-- 一个是上方的选项区域 -->
  <Option></Option>
  <!-- 另一个是下方的滑屏区域 -->
  <Swiper
    :slidesPerView="swiperOption.slidesPerView"
    :direction="swiperOption.direction"
    :freeMode="swiperOption.freeMode"
    :modules="swiperOption.modules"
    class="swiper-container"
  >
    <Swiper-slide
      v-for="(item, index) in theaterScreenData.theaterList"
      :key="index"
      style="height: 3.4rem"
    >
      <TheaterItem :info="item"></TheaterItem>
    </Swiper-slide>
    <Swiper-slide style="height:8rem;"></Swiper-slide>
  </Swiper>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
import Option from "@/components/Option";
import TheaterItem from "@/components/TheaterItem";
export default {
  components: {
    Swiper,
    SwiperSlide,
    Option,
    TheaterItem,
  },
  setup() {
    let theaterScreenData = reactive({
      theaterList: [],
    });
    // 滑屏对应的配置
    let swiperOption = reactive({
      slidesPerView: "auto",
      direction: "vertical",
      freeMode: {
        enabled: true,
        momentumRatio: 2,
        momentumVelocityRatio: 3,
      },
      modules: [FreeMode],
    });

    onMounted(() => {
      getTheaterList();
    });

    function getTheaterList() {
      axios.get("/data/theaterList.json").then(({ data }) => {
        theaterScreenData.theaterList = data.theaterList.theaterData;
      });
    }

    return {
      theaterScreenData,
      swiperOption,
    };
  },
};
</script>

<style scoped>
.swiper-container {
  margin-top: 5.35rem;
}
.theaterArea {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
}
.swiper {
  background-color: #fff;
}
</style>