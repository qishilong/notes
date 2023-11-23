Page({
  data: {
    level : "", // 电量值
    isCharging : "", // 是否在充电
    phone : "", // 电话号码
  },
  onShow(){
    wx.getBatteryInfo({
      success : res => {
        console.log(res);
        this.setData({
          level : res.level,
          isCharging : res.isCharging
        })
      }
    })
  },
  callPhone(){
    // 1. 拿到用户填写的电话号码
    // 2. 调用 wx.makePhoneCall
    if(this.data.phone){
      wx.makePhoneCall({
        phoneNumber : this.data.phone
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '电话号码没有填写',
        showCancel : false
      })
    }
  }
})
