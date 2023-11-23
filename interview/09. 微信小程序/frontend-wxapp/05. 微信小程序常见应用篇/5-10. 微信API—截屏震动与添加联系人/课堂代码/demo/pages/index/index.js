Page({
  data: {
    userCaptureScreen : "用户没有截屏"
  },
  onShow(){
    wx.onUserCaptureScreen(() => {
      this.setData({
        userCaptureScreen : "截屏了！！！"
      })
    })
  },
  // 长震动
  virateLong(){
    wx.vibrateLong({})
  },
  // 短震动
  vibrateShort(){
    wx.vibrateShort({
      type : "heavy"
    })
  },
  // 屏幕常亮
  keepScreenOn(){
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },
  // 添加手机联系人
  addPhoneContact(){
    wx.addPhoneContact({
      firstName: '张三',
      nickName: 'zangsan',
      remark: '程序员',
      mobilePhoneNumber: '13938271434',
      email: '154543234@qq.com'
    })
  }
})
