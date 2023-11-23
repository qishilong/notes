Page({
  data: {
    codeText : "", // 存储用户输入的二维码文本
    imgTempFilePath : "", // 生成的二维码图片路径
  },
  // 根据文本来生成二维码图片
  onGenerate(){
    // 我们请求接口之后，会生成一张二维码的图片
    // 我们需要将这张图片下载下来
    wx.downloadFile({
      url:"http://apis.juhe.cn/qrcode/api?key=5a4f1232be1db0388b7544ebee55e542&type=2&text="+this.data.codeText,
      success : res => {
        this.setData({
          imgTempFilePath : res.tempFilePath
        })
      }
    })
  },
  bindInput(){}
})