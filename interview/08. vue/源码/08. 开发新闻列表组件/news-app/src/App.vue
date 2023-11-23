<template>
  <div id="app">
    <div style="width:1080px; margin:0 auto">
      <NewsList :news="news" />
    </div>
  </div>
</template>

<script>
import NewsList from "./components/news/NewsList";
import { getNews } from "./services/newsService";
export default {
  components: {
    NewsList,
  },
  data() {
    return {
      news: [],
    };
  },
  async created() {
    var resp = await getNews("5572a108b3cdc86cf39001cd");
    this.news = resp.contentlist;
  },
};
</script>
