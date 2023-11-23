// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    newContent : "", // 用户输入新的待办事项
    list: app.globalData.list // 从全局 list 中获取所有任务
  },
  inputHandle(){},
  add(){
    // 添加新的待办事项
    if(this.data.newContent){
      // 添加到全局数据
      app.globalData.list.unshift({
        content : this.data.newContent,
        isComplete: false
      });
      this.setData({
        newContent: '',
        list: app.globalData.list
      });
      wx.showToast({
        title: '新增任务成功',
        icon:'success'
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        icon:'error'
      })
    }
  },
  fresh(){
    // 更新当前页面的 list
    // 因为在不同页面，针对 item 不同的状态会有不同的处理
    // 所以每次点击了 item 之后必须要更新 list
    this.setData({
      list : app.globalData.list
    })
  },
  onShow(){
    this.fresh();
  },
})
