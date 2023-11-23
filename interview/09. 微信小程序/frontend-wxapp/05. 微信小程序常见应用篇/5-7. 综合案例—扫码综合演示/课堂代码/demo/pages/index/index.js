// 扫描类型和中文意思的一个映射
const scanType = {
  'WX_CODE': '微信小程序',
  'QR_CODE': '二维码',
  'EAN_8': '条形码（EAN_8）',
  'EAN_13': '条形码（EAN_13）',
  'UPC_A': '条形码（UPC_A）',
  'UPC_E': '条形码（UPC_E）',
  'CODE_25': '条形码（CODE_25）',
  'CODE_39': '条形码（CODE_39）',
  'CODE_128': '条形码（CODE_128）',
};

Page({
  data: {
    // 存储扫码结果
    scanResult : {
      isShow : false,
      type : "",
      text : ""
    }
  },
  // 扫描对应的事件处理函数
  onScan(){
    wx.scanCode({
      success : res => {
        // 接下来我们就更新 scanResult
        this.setData({
          scanResult : {
            isShow : true,
            type : scanType[res.scanType],
            text : res.result
          }
        });
        // 每一次扫描，需要将这一次扫描存储到本地存储中
        if(this.data.scanResult.text !== ""){
          console.log('here')
          wx.getStorage({
            key : "scanLogs",
            complete : res => {
              let scanLogs = res.data?.length > 0 ? res.data : [];
              // 初始化日期
              this.data.scanResult.date = Date.now();
              scanLogs.unshift(this.data.scanResult);
              // 本地存储
              wx.setStorageSync('scanLogs', scanLogs);
            }
          })
        }
      }
    })
  },
  onCopy(){
    wx.setClipboardData({
      data: this.data.scanResult.text,
    })
  }
})
