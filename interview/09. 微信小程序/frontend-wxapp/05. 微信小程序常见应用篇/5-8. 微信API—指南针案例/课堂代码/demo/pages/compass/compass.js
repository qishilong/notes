Page({
  data: {
    direction : "--", // 方向 【西北】【西南】
    angle : "--", // 【269.72】
    rotate : "", // 罗盘旋转的角度
  },
  onLoad(){
    wx.onCompassChange((res) => {
      // res ---> {accuracy: "unreliable", direction: 202.69806}
      // 根据 direction 就能够获取到精度和角度
      let newAngle = res.direction.toFixed(2); // 202.70
      let radios = res.direction.toFixed(0); // 203
      this.setData({
        angle : newAngle,
        direction : this.check(radios),
        rotate: 360 - radios
      })
    });
    // 判断是否有罗盘
    setTimeout(()=>{
      if(this.data.direction === "--" && this.data.angle === "--"){
        wx.showToast({
          title: '没有电子罗盘',
          icon : "loading",
          duration : 3000,
          mask : true
        })
      }
    },3000);
  },
  // 根据角度来判断方向
  check(i){
    if (15 <= i && i <= 75) {
      return '东北'
    } else if (75 < i && i < 105) {
      return '正东'
    } else if (105 <= i && i <= 165) {
      return '东南'
    } else if (165 < i && i < 195) {
      return '正南'
    } else if (195 <= i && i <= 255) {
      return '西南'
    } else if (255 < i && i < 285) {
      return '正西'
    } else if (285 <= i && i <= 345) {
      return '西北'
    } else {
      return '正北'
    }
  }
})