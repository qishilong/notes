<template>
  <!-- 头部导航 -->
  <section class="topbar between">
    <!-- 左中右分为三个部分 -->
    <div v-if="city" class="area center">
      <a href="#">成都</a>
      <i class="city-entry-arrow"></i>
    </div>
    <ul
      class="between"
      id="topNav"
      :style="width ? { width: width + 'rem' } : {}"
      @touchstart.stop
    >
      <li v-for="(item, index) in nav" :key="index">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
    <a href="#" v-if="search" class="search"></a>
  </section>
  <router-view></router-view>
</template>

<script>
export default {
  name: "SPAContent",
  props: {
    city: {
      type: Boolean,
      default: true,
    },
    search: {
      type: Boolean,
      default: true,
    },
    nav: {
      type: Array,
      default: [],
    },
    width: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
/* 头部导航样式 */
.topbar {
  width: 100%;
  height: 1.24rem;
  border-bottom: 0.01rem solid #e6e6e6;
  font-size: 0.4rem;
  background-color: #fff;
  position: fixed;
  top: 3rem;
  z-index: 100;
}

.topbar > .area {
  width: 1.9rem;
  height: 100%;
}

.topbar > .area > a {
  font-weight: 300;
  position: relative;
}

.city-entry-arrow {
  width: 0;
  height: 0;
  border: 0.1rem solid transparent;
  border-top-color: #b0b0b0;
  margin: 0.1rem 0.1rem 0 0.1rem;
}

.topbar > ul {
  margin: 0 auto;
  width: 90%;
  height: 100%;
}

.topbar > ul > li > a {
  font-size: 0.4rem;
  color: #686868;
  user-select: none;
}

.topbar > ul > li > a.router-link-active {
  font-size: 0.48rem;
  color: #000;
  font-weight: 700;
  position: relative;
}

.topbar > ul > li > a.router-link-active::after {
  content: "";
  width: 0.6rem;
  height: 0.08rem;
  background-color: #e64a48;
  position: absolute;
  left: calc(50% - 0.3rem);
  top: 0.8rem;
  border-radius: 0.3rem;
}

.topbar > a {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.42rem;
  background: url("@/assets/img/search-red.png") center/cover no-repeat;
}
</style>