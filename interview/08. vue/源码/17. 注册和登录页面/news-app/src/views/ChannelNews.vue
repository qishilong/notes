<template>
  <div>
    <div class="type-title">
      {{ channelName }}
    </div>
    <Loading v-if="isLoading" />
    <NewsList v-else :news="news" />
    <Pager
      :page="page"
      :limit="limit"
      :total="total"
      :panelNumber="panelNumber"
      @pageChange="handleChange"
    />
  </div>
</template>

<script>
import NewsList from "../components/news/NewsList";
import Pager from "../components/Pager";
import * as newsServ from "../services/newsService";
import Loading from "../components/Loading";
export default {
  components: {
    Pager,
    NewsList,
    Loading,
  },
  data() {
    return {
      limit: 15,
      total: 0,
      panelNumber: 10,
      news: [],
      isLoading: true,
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    channelName() {
      var channels = this.$store.state.channels.data;
      if (channels.length > 0) {
        var channel = channels.find((item) => item.channelId === this.$route.params.id)
        return channel.name;
      }
      return "";
    },
  },
  methods: {
    // 设置所有新闻相关数据
    async setDatas() {
      this.isLoading = true;
      var resp = await newsServ.getNews(
        this.$route.params.id,
        this.page,
        this.limit
      );
      this.total = resp.allNum;
      this.news = resp.contentlist;
      this.isLoading = false;
    },
    handleChange(newPage) {
      // 如何在代码中导航
      // 命令式导航
      this.$router.push({
        query: {
          page: newPage,
        },
      });
      this.setDatas();
    },
  },
  watch: {
    // 监控某些数据的变化，当数据变化时要做一些事儿
    "$route.params.id": {
      immediate: true, //一开始的数据也要当做是一种变化
      handler() {
        this.setDatas();
      },
    },
  },
};
</script>

<style scoped>
.type-title {
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
