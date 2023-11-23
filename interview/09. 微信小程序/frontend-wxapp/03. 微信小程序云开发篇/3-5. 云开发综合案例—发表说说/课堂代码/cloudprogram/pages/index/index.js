const db = wx.cloud.database();
const messages = db.collection('messages');

Page({
  data: {
    list: [], // 存储说说列表
  },
  // 显示首页的时候，从云端数据库拉取说说
  async onShow() {
    const {
      data
    } = await messages.get({
      limit: 5
    });
    this.setData({
      list : data
    })
  }
})