<template>
  <div id="app">
    <div style="width:1080px; margin:0 auto">
      <Channels @change="handleChange" />
    </div>
  </div>
</template>

<script>
import Channels from "./components/news/Channels";
export default {
  components: {
    Channels,
  },
  methods: {
    handleChange(newId) {
      console.log(newId);
    },
  },
};
</script>
