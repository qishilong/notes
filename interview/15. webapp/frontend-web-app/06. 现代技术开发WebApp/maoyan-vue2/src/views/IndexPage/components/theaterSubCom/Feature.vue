<template>
  <Swiper
    :slidesPerView="swiperOption.slidesPerView"
    :direction="swiperOption.direction"
    :freeMode="swiperOption.freeMode"
    :modules="swiperOption.modules"
    class="specialTabContent"
  >
    <Swiper-slide style="height: 1.2rem">
      <h3>特色功能</h3>
    </Swiper-slide>
    <Swiper-slide style="height: 1.04rem" class="specialItemContainer">
      <div
        class="specialItem"
        v-for="(item, index) in theaterScreenData.labelList.specialFunc"
        :key="index"
      >
        {{ item.labelName }}
      </div>
    </Swiper-slide>
    <Swiper-slide style="height: 1.2rem">
      <h3>特殊厅</h3>
    </Swiper-slide>
     <Swiper-slide 
        style="height: 1.04rem" 
        class="specialItemContainer"
        v-for="(item, index) in theaterScreenData.specialTheaterData"
        :key="index"
    >
      <div
        class="specialItem"
        v-for="(item, index) in item"
        :key="index"
      >
        {{ item.labelName.length > 6 ? item.labelName.slice(0, 6) + "..." : item.labelName }}
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
      labelList: [],
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
        theaterScreenData.labelList = data.theaterList.labelData[0];
        // 针对特殊厅的数据，我们需要进行一个分组，每组的数量为 4 个
        let theaterCount = theaterScreenData.labelList.specialTheater;
        let num = Math.ceil(theaterCount.length / 4);
        let theaterGroup = [];
        for (let i = 0; i < num; i++) {
          theaterGroup.push(theaterCount.slice(i * 4, (i + 1) * 4));
        }
        theaterScreenData.specialTheaterData = theaterGroup;
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
/* 特色隐藏区域 */
.closeTab .specialTabContent {
  width: 100%;
  height: 7.75rem;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 1.08rem;
  font-size: 0.4rem;
}

.specialTabContent h3 {
  font-size: 0.4rem;
  color: #717171;
}

.specialTabContent .specialItemContainer {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}

.specialTabContent .specialItem {
  width: 2.22rem;
  height: 1.04rem;
  border: 0.03rem solid #cdcdcd;
  line-height: 1.04rem;
  text-align: center;
  border-radius: 0.1rem;
  margin-left: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.28rem;
}

.specialTabBtn {
  width: 100%;
  height: 1.7rem;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.3rem;
  box-sizing: border-box;
  margin-top: 7.75rem;
}

.specialTabBtn > button {
  font-size: 0.36rem;
  width: 2.3rem;
  height: 0.94rem;
  border: 0.03rem solid #cdcdcd;
  border-radius: 0.2rem;
  background-color: transparent;
}

.specialTabBtn > button:nth-child(2) {
  background-color: #f03e37;
  color: #fff;
  border: 0.03rem solid #f03e37;
}
</style>