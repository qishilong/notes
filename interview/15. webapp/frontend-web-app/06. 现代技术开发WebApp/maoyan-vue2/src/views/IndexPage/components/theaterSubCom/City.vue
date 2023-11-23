<template>
  <div class="cityTabContent optionTabContent" id="cityTabContent">
    <div class="cityTabContentTop">
      <div>商区</div>
      <div>地铁站</div>
    </div>
    <div class="cityTabContentBottom">
      <!-- 里面又分为一左一右 -->
      <Swiper
        :slidesPerView="swiperOption.slidesPerView"
        :direction="swiperOption.direction"
        :freeMode="swiperOption.freeMode"
        :modules="swiperOption.modules"
        class="city_left"
      >
        <Swiper-slide
          v-for="(item, index) in theaterScreenData.areaList"
          :key="index"
          style="height: 1.2rem"
        >
          <div class="between item">
            {{item.areaName}}{{item.areaNumber}}
          </div>
        </Swiper-slide>
      </Swiper>
      <Swiper
        :slidesPerView="swiperOption.slidesPerView"
        :direction="swiperOption.direction"
        :freeMode="swiperOption.freeMode"
        :modules="swiperOption.modules"
        class="city_right"
      >
        <Swiper-slide
          v-for="(item, index) in theaterScreenData.streetList"
          :key="index"
          style="height: 1.2rem"
        >
          <div class="between item">
            <span>{{ item.streetName }}</span>
            <span>{{ item.streetNumber }}</span>
          </div>
        </Swiper-slide>
      </Swiper>
    </div>
  </div>
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
        theaterScreenData.areaList = data.theaterList.areaData;
        theaterScreenData.streetList = data.theaterList.streetData;
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
/* 全城隐藏区域 */

.closeTab .cityTabContent {
  width: 100%;
  height: 11.7rem;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 1.08rem;
  font-size: 0.4rem;
}

.cityTabContent .cityTabContentTop {
  width: 100%;
  height: 1.2rem;
  display: flex;
}

.cityTabContentTop > div {
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 1.2rem;
  font-size: 0.4rem;
  box-sizing: border-box;
}

.cityTabContentTop > div:nth-child(1) {
  color: #f43b32;
  border-bottom: 0.03rem solid #f43b32;
}

.cityTabContentBottom {
  height: 10.5rem;
  width: 100%;
  display: flex;
}

.cityTabContentBottom .item {
  line-height: 1.2rem;
}

.cityTabContentBottom .city_left {
  width: 35%;
  height: 100%;
}

.city_left .item {
  background-color: #fff;
  text-indent: 0.3rem;
}

.city_left .swiper-slide:nth-child(2) .item {
  background-color: #f6f6f6;
}

.cityTabContentBottom .city_right {
  width: 65%;
  height: 100%;
}

.city_right .item {
  width: 100%;
  background-color: #f6f6f6;
  box-sizing: border-box;
  padding: 0 0.28rem 0 0.65rem;
}
</style>