export default function ({$axios}) {
  $axios.interceptors.response.use(config => {
    if (config.data.code == 200) {
      return config.data;
    }
    return Promise.reject(config.data);
  });
}
