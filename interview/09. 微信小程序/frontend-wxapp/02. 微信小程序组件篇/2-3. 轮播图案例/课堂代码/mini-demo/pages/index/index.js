Page({
  data: {
    imgUrls: [
      'https://file.moyublog.com/d/file/2021-02-17/e50db8f1b1ab841c863a49250b79d367.jpg',
      'https://img.tt98.com/d/file/pic/2018081420174325/5b63b5ccdad61.jpg',
      'https://img2.baidu.com/it/u=2344850090,2589644779&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
      'https://img1.baidu.com/it/u=536270855,1477431967&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
    ],
    swiperIndex : 0, // 轮播的下标
  },
  swiperchange(e){
    this.setData({
      swiperIndex : e.detail.current
    })
  }
})