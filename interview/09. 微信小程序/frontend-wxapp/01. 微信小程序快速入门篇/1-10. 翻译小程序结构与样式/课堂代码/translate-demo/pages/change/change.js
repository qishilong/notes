const app = getApp(); // 获取实例
Page({
  data: {
    lanList : app.globalData.lanList, // 从全局获取所有的语言
    curLanIndex : app.globalData.curLan.index// 当前语言的索引
  },
})