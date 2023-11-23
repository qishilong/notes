<template>
  <Center>
    <h1>登录验证中...</h1>
  </Center>
</template>

<script>
import Center from "@/components/Center";
import { mapState } from "vuex";
export default {
  components: {
    Center,
  },
  computed: mapState("loginUser", ["data", "isLoading"]),
  methods: {
    handleLogin() {
      if (this.isLoading) {
        return;
      }
      if (this.data) {
        if (this.$route.query.returnurl) {
          this.$router.push(this.$route.query.returnurl);
        } else {
          this.$router.push({ name: "Personal" });
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.handleLogin();
      },
    },
    isLoading: {
      immediate: true,
      handler() {
        this.handleLogin();
      },
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2em;
}
</style>
