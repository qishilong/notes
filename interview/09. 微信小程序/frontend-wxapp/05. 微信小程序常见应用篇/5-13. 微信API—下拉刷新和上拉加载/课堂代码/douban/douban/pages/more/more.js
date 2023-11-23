// pages/hotMovies/hotMovies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {
      rows: [], // 该数组用于存放从后台获取到的数据
      start: 0, // 查询的起始下标
      count: 18 // 查询的条数
    }
  },
  // 获取数据方法
  getMovies(startIndex = 0) {
    const _this = this;
    wx.request({
      url: 'http://localhost:3000/movies/hot',
      data: {
        start: this.data.movies.start + startIndex, // 查询的起始下标
        count: this.data.movies.count // 查询的条数
      },
      success({ data }) {
        // 重新更新电影数据
        _this.setData({
          movies: {
            ..._this.data.movies,
            ...data,
            rows: [..._this.data.movies.rows, ...data.rows]
          }
        }, () => {
          wx.hideLoading(); // 关闭 Loading
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: "热映"
    })
    // 打开 Loading 以表示“正在加载”
    wx.showLoading({
      title: '加载中'
    })
    this.getMovies(); // 获取电影数据
  },
  /**
   * 监听下拉操作
   */
  onPullDownRefresh(){
    wx.showLoading({
      title: '数据加载中',
    });
    this.getMovies(); // 获取最新的数据
  },
  /**
   * 页面触底时触发
   */
  onReachBottom(){
    if(this.data.movies.start > this.data.movies.total){
      wx.showModal({
        title: '提示',
        content: '没有更多内容了',
        complete: (res) => {
          if (res.cancel) {
            console.log("用户点击了取消");
          }
          if (res.confirm) {
            console.log("用户点击了确定");
          }
        }
      });
      return;
    }
    // 加载下一页数据
    wx.showLoading({
      title: '更多电影加载中...',
    });
    this.getMovies(18);
  }
})