const app = getApp()

Page({
  data: {
   
  },
  // 跳转到选择语言
  goToChange(){
    wx.navigateTo({
      url: '/pages/change/change',
    })
  }
})
