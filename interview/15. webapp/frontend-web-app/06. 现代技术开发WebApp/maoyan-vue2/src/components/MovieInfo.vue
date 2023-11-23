<template>
  <div class="movieContainer">
    <!-- 左边图片 -->
    <div class="moviePoster center">
      <img :src="movieInfo.imgURL" alt="" />
    </div>
    <!-- 右边电影具体内容 -->
    <div class="movieDetails">
      <h3 v-if="type == 'movie'">
        {{
          movieInfo.title.length > 7
            ? movieInfo.title.slice(0, 8)
            : movieInfo.title
        }}<span class="imax" v-if="movieInfo.isIMAX"></span>
      </h3>
      <h3 v-if="type == 'classicMovie' || type == 'willcoming'">
        {{ movieInfo.title }}
      </h3>
      <p>
        观众评<span>{{ movieInfo.score }}</span>
      </p>
      <p>
        主演{{
          movieInfo.mainActor.length > 12
            ? movieInfo.mainActor.slice(0, 13) + "..."
            : movieInfo.mainActor
        }}
      </p>
      <p v-if="type == 'movie'">今天{{movieInfo.theaterCount}}家影院放映{{movieInfo.playCount}}场</p>
      <p v-else-if="type == 'willcoming'">{{movieInfo.releaseDate}}上映</p>
      <p v-else-if="type == 'classicMovie'">{{movieInfo.releaseDate}}{{movieInfo.releaseLocation}}上映</p>
      <div v-if="type == 'movie'" class="btn buyTicket">购票</div>
      <div v-else-if="type == 'willcoming'" class="btn bookTicket">待售</div>
      <div v-else-if="type == 'classicMovie'" class="classicMovieScore">
          <span class="score">{{movieInfo.score}}</span>分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieInfo: {
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
.movieContainer {
  width: 100%;
  height: 3.1rem;
  display: flex;
}

.movieContainer .moviePoster {
  width: 2.45rem;
  height: 100%;
}

.movieContainer .moviePoster img {
  width: 1.76rem;
  height: 2.48rem;
}

.movieContainer .movieDetails {
  width: 8.35rem;
  height: 100%;
  border-bottom: 0.02rem solid #eee;
  position: relative;
}

.movieContainer .movieDetails > h3 {
  font-size: 0.5rem;
  line-height: 1.2rem;
  color: #000;
  font-weight: 400;
}

.movieContainer .movieDetails > h3 > span.imax {
  display: inline-block;
  width: 1.25rem;
  height: 0.4rem;
  margin-left: 0.15rem;
  background: url("@/assets/img/v2dimax.png") center/contain no-repeat;
}

.movieContainer .movieDetails > p {
  font-size: 0.32rem;
  margin-bottom: 0.2rem;
  font-weight: 400;
}

.movieDetails > p:nth-child(2) span {
  font-weight: 700;
  color: #faaf00;
  font-size: 0.36rem;
  margin-left: 0.1rem;
}

.movieContainer .movieDetails .btn {
  position: absolute;
  right: 0.37rem;
  top: calc(50% - 0.39rem);
  width: 1.5rem;
  height: 0.78rem;

  border-radius: 0.4rem;
  font-size: 0.36rem;
  color: #fff;
  text-align: center;
  line-height: 0.77rem;
}

.buyTicket {
  background-color: #ee3f37;
}

.bookTicket {
  background-color: rgb(87, 158, 224);
}
.classicMovieScore {
  position: absolute;
  right: 0.37rem;
  top: 0.35rem;
  font-size: 0.32rem;
}
.score {
  font-size: 0.36rem;
  color: #faaf00;
  font-weight: 700;
}
</style>