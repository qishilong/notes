const {formatTime} = require("../../utils/util");
Page({
  data: {
    scanLogs : []
  },
  onShow(){
    // 从本地存储中获取 key 为 scanLogs 的存储记录
    wx.getStorage({
      key : "scanLogs",
      success : res => {
        this.setData({
          scanLogs : (res.data || []).map(n => {
            n.date = formatTime(new Date(n.date));
            n.text = n.text.length > 10 ? n.text.slice(0,10) + "..." : n.text;
            return n;
          })
        })
      }
    })
  }
})