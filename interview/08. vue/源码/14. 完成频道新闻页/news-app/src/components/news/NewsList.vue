<template>
  <div>
    <div v-for="item in news" :key="item.id" class="news-item-normal">
      <div class="image" v-if="item.havePic">
        <a :href="item.link" target="_blank">
          <img :src="item.imageurls[0].url" alt="" />
        </a>
      </div>
      <div class="words">
        <h2 class="title">
          <a :href="item.link" target="_blank">
            {{ item.title }}
          </a>
        </h2>
        <div class="aside">
          <span>{{ item.channelName }}</span>
          <span>来源：{{ item.source }}</span>
          <span>发布日期：{{ item.pubDate }}</span>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.news-item-normal {
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  padding: 20px 0;
}
.image {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  float: left;
  margin-right: 20px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.title {
  font-size: 1.5em;
}
.aside {
  font-size: 14px;
  color: #888;
}
.aside span {
  margin-right: 15px;
}

.content {
  max-height: 100px;
  overflow: hidden;
  line-height: 2;
}
</style>
