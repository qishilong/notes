// channels 的仓库数据
import { getNewsChannels } from "../services/newsService";

export default {
  namespaced: true, // 开启命名空间
  state: {
    data: [],
    isLoading: false,
  },
  mutations: {
    // 这里配置多种变异方式
    // state: 原来的状态
    // payload： 负荷, true 或 false
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    // payload： 负荷，约定是一个数组
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchDatas(context) {
      // 设置isLoading为true
      context.commit("setIsLoading", true);
      var channels = await getNewsChannels();
      // 设置data为channels
      context.commit("setData", channels);
      // 设置isLoading为false
      context.commit("setIsLoading", false);
    },
  },
};
