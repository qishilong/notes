<template>
  <div>
    <Pager
      :page="page"
      :limit="10"
      :total="2011"
      :panelNumber="6"
      @pageChange="handleChange"
    />
  </div>
</template>

<script>
import Pager from "../components/Pager";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      page: 3,
    };
  },
  methods: {
    handleChange(newPage) {
      this.page = newPage;
    },
  },
};
</script>

<style></style>
