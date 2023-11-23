// pages/components/movieItem/movieItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {} // 设置默认值
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      wx.navigateTo({
        url: "../../pages/detail/detail"
      });
      // 将当前点击的电影数据保存至本地，在详情页面直接从本地获取
      wx.setStorage({
        key: 'currentMovie',
        data: this.properties.item,
      })
    }
  }
})