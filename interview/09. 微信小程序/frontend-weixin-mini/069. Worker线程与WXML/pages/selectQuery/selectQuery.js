// pages/selectQuery/selectQuery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 查询返回指定控件信息
   */
  selectQuery(){
    //创建对象
    const query = wx.createSelectorQuery()
    //绑定选定区块
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset()
    //执行
    query.exec((res)=>{
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})