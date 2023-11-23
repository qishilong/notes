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
  },
  test(){
    console.log('触发了 li 的自定义事件 test');
  }
})
