// pages/detail/detail.js
Page({
  data: {
    id : null,
    scanResult : {}
  },
  // 获取缓存的数据
  onLoad(options){
    // console.log(options.id)
    // 从缓存中获取对应 id 的扫描内容
    wx.getStorage({
      key : "scanLogs",
      success : res => {
        // console.log(res.data[options.id]);
        this.setData({
          scanResult : res.data[options.id],
          id : options.id
        })
      }
    })
  },
  // 删除
  onDelete(){
    // 从缓存中获取对应 id 的扫描内容
    wx.getStorage({
      key : "scanLogs",
      success : res => {
       let scanLogs = res.data;
       scanLogs.splice(this.data.id, 1);
       // 更新本地存储数据
       wx.setStorageSync('scanLogs', scanLogs);
       wx.navigateBack();
      }
    })
  }
})