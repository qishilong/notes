// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: []
  },
  searchMovie(e){
    let _this = this;
    wx.request({
      url: 'http://localhost:3000/movies/searchMovies', // 手机可以访问到
      data: {
        title: e.detail.value
      },
      method : 'POST',
      success({ data }) {
        _this.setData({
          searchResult: data.rows
        })
      }
    })
  },
})