<template>
  <Swiper
    :slidesPerView="swiperOption.slidesPerView"
    :direction="swiperOption.direction"
    :freeMode="swiperOption.freeMode"
    :modules="swiperOption.modules"
    class="swiper-container"
  >
    <Swiper-slide style="height: 5.9rem">
      <Slider :list="hotMovieScreenData.hotMovieData" type="movie"
        >近期最受期待</Slider
      >
    </Swiper-slide>
    <Swiper-slide
      v-for="(item, index) in hotMovieScreenData.hotMovieData"
      :key="index"
      style="height: 3.11rem"
    >
      <div class="movieList">
        <MovieInfo :movieInfo="item" type="willcoming"></MovieInfo>
      </div>
    </Swiper-slide>
    <Swiper-slide style="height:6rem;"></Swiper-slide>
  </Swiper>
</template>

<script>
import { reactive, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode } from "swiper";
import "swiper/css";
import axios from "axios";
import Slider from "@/components/Slider";
import MovieInfo from "@/components/MovieInfo";
export default {
  components: {
    Swiper,
    SwiperSlide,
    Slider,
    MovieInfo,
  },
  setup() {
    let hotMovieScreenData = reactive({
      hotMovieData: [],
      actorListData: [],
      entertainmentNews: [],
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

    // 获取热门电影数据
    function getMovieList() {
      axios.get("/data/movieList.json").then(({ data }) => {
        hotMovieScreenData.hotMovieData = data;
      });
    }
    // 获取热门影人数据
    function getActorList() {
      axios.get("/data/actorList.json").then(({ data }) => {
        hotMovieScreenData.actorListData = data;
      });
    }
    // 获取娱乐新闻数据
    function getEntertainmentNews() {
      axios.get("/data/entertainmentNews.json").then(({ data }) => {
        hotMovieScreenData.entertainmentNews = data;
      });
    }

    onMounted(() => {
      getMovieList();
      getActorList();
      getEntertainmentNews();
    });

    return {
      swiperOption,
      hotMovieScreenData,
    };
  },
};
</script>

<style scoped>
.swiper-container {
  margin-top: 4.25rem;
}
.movieList {
  background-color: #fff;
}
/* 娱乐新闻 */
.movieNews {
  height: auto;
  background-color: #fff;
  margin-bottom: 1.5rem;
  padding: 0.45rem 0.4rem;
}

.movieNews > h2 {
  font-size: 0.4rem;
  color: #000;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.movieNews li > a {
  font-size: 0.38rem;
  color: #000;
  font-weight: 300;
  margin-bottom: 0.5rem;
}
</style>