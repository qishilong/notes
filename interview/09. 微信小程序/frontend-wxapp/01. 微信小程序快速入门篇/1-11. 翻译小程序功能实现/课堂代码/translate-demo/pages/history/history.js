const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList : app.globalData.history
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      historyList : app.globalData.history
    })
  },
  // 清除历史记录
  clearHistory(){
    // 1. 清除全局 history 的值，清除 historyList
    this.setData({
      historyList : ""
    });
    app.globalData.history = [];
    // 2. 清除本地缓存，下次进来的时候，历史记录也是空的
    wx.removeStorage({
      key: 'histroy',
      success(){
        console.log("本地缓存已清除")
      }
    })
  }
})