// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    count : 1
  },
  tapHandle(){
    this.setData({
      count : this.data.count + 1
    })
  }
})
