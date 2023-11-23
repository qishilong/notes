Page({
  data: {
    img : "",
  },
  scanCode1(){
    wx.scanCode({
      // 扫码成功后，就能够得到该条码上面的信息
      // 之后针对这个信息做相应的后续处理即可
      success :({result})=>{
        this.setData({
          img : result
        })
      }
    })
  },
  scanCode2(){
    wx.scanCode({
      onlyFromCamera : true,
      // 扫码成功后，就能够得到该条码上面的信息
      // 之后针对这个信息做相应的后续处理即可
      success :({result})=>{
        this.setData({
          img : result
        })
      }
    })
  }
})
