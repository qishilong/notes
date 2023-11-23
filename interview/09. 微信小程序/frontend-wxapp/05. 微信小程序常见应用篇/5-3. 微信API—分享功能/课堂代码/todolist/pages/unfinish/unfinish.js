const app = getApp();
Page({
  data: {
    list : app.globalData.list.filter(i=>!i.isComplete)
  },
  onShow(){
    this.fresh();
  },
  fresh(){
    // 更新当前页面的 list
    // 因为在不同页面，针对 item 不同的状态会有不同的处理
    // 所以每次点击了 item 之后必须要更新 list
    this.setData({
      list : app.globalData.list.filter(i=>!i.isComplete)
    })
  }
})