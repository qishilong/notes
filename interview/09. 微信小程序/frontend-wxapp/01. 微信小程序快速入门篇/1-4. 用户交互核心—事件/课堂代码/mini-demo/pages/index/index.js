// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    a : 10,
    b : 15,
    time : (new Date()).toString(),
    age : 20,
    fruits : ["苹果","香蕉","哈密瓜"],
    color: 'blue',
    eleFontsize: '48rpx'
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
  }
})
