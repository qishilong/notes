// pages/register/register.js
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

  loginHandler(){},
  passHandler(){},
  // 向服务器发送 Get 请求
  sendGet(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://localhost:3000',
      data : {
        loginId : this.data.loginId,
        password : this.data.password
      },
      success(e){
        console.log(e);
      },
      fail(){
        wx.showToast({
          title: '请求失败',
          icon: "error"

        })
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
  // 向服务器发送 Post 请求
  sendPost(){
    wx.request({
      url: 'http://localhost:3000/abc',
      method : "POST",
      data : {
        loginId : this.data.loginId,
        password : this.data.password
      },
      success:(e)=>{
        // 这里我们就应该将数据缓冲到本地存储中
        wx.setStorageSync('loginId', this.data.loginId);
        wx.setStorageSync('password', this.data.password);
        wx.showToast({
          title: '注册成功',
        })
      }
    })
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