// pages/components/stars/stars.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    star: {
      type: String
    },
    average: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    srcArr: []
  },
  // 自定义组件生命周期方法
  lifetimes: {
    attached() {
      // 设置默认值
      if (this.data.star === '00' && this.data.average == 0) {
        this.setData({
          star: '35',
          average: '6.5'
        })
      }
      let arr = [];
      // 获取星级的每一位
      let one = this.data.star[0] * 1;
      let two = this.data.star[1] * 1;
      // 推入满星的 src
      for (let i = 0; i < one; i++) {
        arr[i] = '../../assets/images/icons/star_on.png';
      }
      // 推入半星的 src
      if (two == 5) {
        arr[one] = '../../assets/images/icons/star_half.png'
      }
      // 推入空星的 src
      for (let i = arr.length; i < 5; i++) {
        arr[i] = '../../assets/images/icons/star_off.png';
      }
      // 更新 srcArr
      this.setData({
        srcArr: arr
      })
    }
  }
})