// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}, // 用于存放电影数据
    summary: '', // 电影简介需要单独处理
    height: '150rpx',
    isComplete: '展开'
  },

  moreIntro() {
    if (this.data.isComplete === '展开') {
      this.setData({
        height: 'auto',
        isComplete : '收起'
      })
    } else {
      this.setData({
        height: '150rpx',
        isComplete: '展开'
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    wx.getStorage({
      key: 'currentMovie',
      success: function(res) {
        _this.setData({
          movie: res.data
        }, function() {
          // 处理电影简介
          let str = res.data.summary;
          str = str.split('').filter(item => {
            if (item !== '<' && item !== 'p' && item !== '>' && item !== '/') {
              return item
            }
          }).join('');
          _this.setData({
            summary: str
          })
        })
      },
    })
  }
})