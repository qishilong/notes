// logs.js
const util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad(options) {
    console.log(options.id);
    console.log(options.other);

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
