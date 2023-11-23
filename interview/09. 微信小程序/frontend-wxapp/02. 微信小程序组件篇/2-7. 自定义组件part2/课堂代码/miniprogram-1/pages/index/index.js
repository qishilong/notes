// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    count : 1,
    text : ""
  },
  tapHandle(){
    this.setData({
      count : this.data.count + 1
    });
    // 获取子组件的实例
    const child = this.selectComponent('.item');
    console.log(child);
  },
  myEventHandle(e){
    this.setData({
      text : e.detail.inputContent
    })
  }
})
