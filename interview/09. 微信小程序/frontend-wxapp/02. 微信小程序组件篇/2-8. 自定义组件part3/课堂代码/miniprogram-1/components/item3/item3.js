Component({
  options: {
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  data : {
    // 纯数据字段，它的作用就是拿来参与计算，不参与页面的渲染
    _rgb : {
      r : 0,
      g : 0,
      b : 0
    },
    fullColor : '0,0,0', // 指定颜色，该字段是一个普通的数据字段，会参阅页面的渲染
  },
  methods : {
    // 可以看到，纯数据字段，就是拿来做计算的
    tapHandle1(){
      this.setData({
        '_rgb.r' : this.data._rgb.r + 5 > 255 ? 255 : this.data._rgb.r + 5
      })
    },
    tapHandle2(){
      this.setData({
        '_rgb.g' : this.data._rgb.g + 5 > 255 ? 255 : this.data._rgb.g + 5
      })
    },
    tapHandle3(){
      this.setData({
        '_rgb.b' : this.data._rgb.b + 5 > 255 ? 255 : this.data._rgb.b + 5
      })
    },
  },
  observers : {
    '_rgb.**' : function(obj){
      this.setData({
        fullColor : `${obj.r},${obj.g},${obj.b}`
      })
    }
  }
})