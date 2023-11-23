<template>
  <Swiper
    :slidesPerView="swiperOption.slidesPerView"
    :direction="swiperOption.direction"
    :freeMode="swiperOption.freeMode"
    :modules="swiperOption.modules"
    class="brandTabContent"
  >
    <Swiper-slide
      v-for="(item, index) in theaterScreenData.theaterList"
      :key="index"
      style="height: 1.2rem"
    >
      <div class="between item">
          <span>{{item.theaterClassificationName}}</span>
          <span>{{item.theaterClassificationNumber}}</span>
      </div>
    </Swiper-slide>
  </Swiper>
</template>

<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
export default {
  components: {
    Swiper,
    SwiperSlide,
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
        theaterScreenData.theaterList =
          data.theaterList.theaterClassificationData;
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
/* 品牌隐藏区域 */
.closeTab .brandTabContent {
  width: 100%;
  height: 9.65rem;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 1.08rem;
  font-size: 0.4rem;
}

.brandTabContent .item {
  width: 100%;
  height: 1.2rem;
  border-bottom: 0.03rem solid #e6e6e6;
  padding: 0 0.6rem 0 0.7rem;
  box-sizing: border-box;
}
</style>