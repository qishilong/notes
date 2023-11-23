// index.js
// 获取应用实例
const app = getApp()
console.log("globalData: ",app.globalData);

Page({
  data: {
    a : 10,
    b : 15,
    time : (new Date()).toString(),
    age : 20,
    fruits : ["苹果","香蕉","哈密瓜"],
    color: 'blue',
    eleFontsize: '48rpx',
    test: "this is a test"
  },
  // 事件处理函数
  // 会自动传入一个参数，该参数为此次事件对应的事件对象
  tapHandle(e){
    console.log(e.detail);
  },
  outtertap(){
    console.log("触发了 outter 事件");
  },
  middletap(){
    console.log("触发了 middle 事件");
  },
  innertap(){
    console.log("触发了 inner 事件");
  },
  onLoad(){
    console.log("onLoad");
  },
  onShow(){
    console.log("onShow");
  },
  onReady(){
    console.log("onReady");
  },
  onHide(){
    console.log("onHide");
  },
  onUnload(){
    console.log("onUnload");
  },
  goToLog(){
    // wx.navigateTo({ url: '/pages/test/test?id=1&other=abc' })
    wx.redirectTo({
      url: '/pages/test/test',
    })
  },
  editTestHandle(){
    this.data = "bbb"
    // this.setData({
    //   test : "aaaaaa"
    // }, function(){
    //   console.log("修改完毕，页面已经更新了")
    // })
  }
})
