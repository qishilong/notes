<template>
  <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart">
    <ul
      class="images"
      :style="{
        width: banners.length * 100 + '%',
        marginLeft: -index * 100 + '%',
      }"
    >
      <li v-for="(item, i) in banners" :key="i">
        <a :href="item.link"><img :src="item.url" alt=""/></a>
      </li>
    </ul>
    <ul class="dots">
      <li
        v-for="(item, i) in banners"
        :key="i"
        :class="{
          active: i === index,
        }"
        @click="index = i"
      ></li>
    </ul>
  </div>
</template>

<script>
// js
// 思考：哪些数据需要放到js中管理
// 图片信息数组 [{url:"xxxxx", link:"xxxxx"}]，当前显示的是第几张图片
export default {
  props: {
    banners: {
      type: Array, //属性类型是数组
      required: true, //必须要传递该属性
    },
    duration: {
      type: Number,
      default: 2000, //属性默认值
    },
  },
  created() {
    this.autoStart();
  },
  destroyed() {
    this.autoStop();
  },
  data() {
    return {
      index: 0, //当前显示的是第几张图片
      timer: null,
    };
  },
  methods: {
    // 自动开始切换
    autoStart() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.banners.length;
      }, this.duration);
    },
    // 停止自动切换
    autoStop() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>

<style scoped>
/* 样式 */
.banner-container {
  height: 350px;
  position: relative;
  overflow: hidden;
}
.banner-container li {
  display: block;
  width: 1080px;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 0.5s;
}
.banner-container img {
  width: 1080px;
  height: 100%;
}
.dots {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
}
.dots li {
  width: 10px;
  cursor: pointer;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
}
.dots li.active {
  background: #fff;
}
</style>
