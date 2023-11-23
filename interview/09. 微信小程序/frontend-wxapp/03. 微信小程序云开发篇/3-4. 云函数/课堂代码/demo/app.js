// app.js
App({
  onLaunch() {
    // 初始化云服务
    wx.cloud.init({
      env: 'cloud1-5gsobkys7eb1b3ef'
    });
  },
  globalData: {
    userInfo: null
  }
})
