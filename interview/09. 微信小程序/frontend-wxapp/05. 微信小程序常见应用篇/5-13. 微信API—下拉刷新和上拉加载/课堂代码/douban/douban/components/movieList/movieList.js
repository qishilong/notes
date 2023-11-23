// components/movieList/movieList.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这里定义了 title 和 rows 属性，这两个属性由父组件传递过来
    title: {
      type: String
    },
    rows: {
      type: Array
    }
  }
})
