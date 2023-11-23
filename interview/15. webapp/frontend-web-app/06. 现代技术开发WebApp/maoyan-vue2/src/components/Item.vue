<template>
  <a href="#">
    <img :src="info.imgURL" alt="" />
    <span v-if="type == 'movie'" class="mark">观众评分{{info.score}}</span>
    <span v-else-if="type=='willcoming'" class="mark">{{info.wantSeeCount}}人想看</span>
    <span>{{
      info.title.length > 5 ? info.title.slice(0, 5) : info.title
    }}</span>
  </a>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "movie",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
a {
  display: block;
  position: relative;
}

img {
  width: 2.35rem;
  height: 3.15rem;
  margin-bottom: 0.25rem;
}

span {
  display: block;
  font-size: 0.36rem;
  font-weight: 600;
}

/* 热门电影单独的样式 */

a > span.mark {
  position: absolute;
  left: 0;
  bottom: 0.65rem;
  color: #faaf00;
  font-size: 0.3rem;
  width: 100%;
  height: 0.5rem;
  background-image: linear-gradient(-180deg, rgba(77, 77, 77, 0), #000);
  line-height: 0.5rem;
  text-indent: 0.1rem;
  font-weight: 400;
}
</style>