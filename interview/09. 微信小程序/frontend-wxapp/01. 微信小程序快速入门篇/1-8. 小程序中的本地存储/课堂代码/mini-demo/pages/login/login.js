// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginId : "",
    password : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 首先从本地缓存中获取缓存的 loginId 以及 password
    const loginIdStorageData = wx.getStorageSync('loginId');
    const passwordStorageData = wx.getStorageSync('password');

    // 判断是否有数据，如果有，就赋值给 data
    if(loginIdStorageData){
      this.setData({
        loginId : loginIdStorageData
      })
    }

    if(passwordStorageData){
      this.setData({
        password : passwordStorageData
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})