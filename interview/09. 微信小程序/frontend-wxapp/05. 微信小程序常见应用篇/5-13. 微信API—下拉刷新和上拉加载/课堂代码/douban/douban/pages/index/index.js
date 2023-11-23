// pages/index/index.js

Page({
  data: {
    hots: [], // 该数组用于存放从后台拉取回来的数据
    comings: [] // 该数组用于存放从后台拉取回来的数据
  },
  getHotMovies() {
    const _this = this;
    wx.request({
      url: 'http://localhost:3000/movies/hot', // 手机可以访问到
      data: {
        count: 10 // 请求 10 条数据
      },
      success({ data }) {
        // 将请求回来的数据存储到 hots 数组里面
        _this.setData({
          hots: data.rows
        })
      }
    })
  },
  getComingMovies() {
    const _this = this;
    wx.request({
      url: 'http://localhost:3000/movies/coming', // 手机可以访问到
      data: {
        count: 10 // 请求 10 条数据
      },
      success({ data }) {
        _this.setData({
          comings: data.rows
        })
      }
    })
  },
  onLoad: function (options) {
    // 一进入首页就开始从后台请求数据
    this.getHotMovies();
    this.getComingMovies();
  }
})