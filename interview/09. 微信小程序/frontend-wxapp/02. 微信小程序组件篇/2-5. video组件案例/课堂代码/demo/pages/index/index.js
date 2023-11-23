function getRandomColor () {
  const rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    damuList : [{
      text : "第1s出现的弹幕",
      time : 1,
      color : "white"
    },{
      text : "asasasad",
      time : 3,
      color : "white"
    }],
    newDanmu : "", // 用户输入的新弹幕的内容
  },
  inputHandle(){},
  // 无论是发送弹幕，还是控制整个视频的播放或者暂停
  // 我们都需要拿到这个 video 的上下文对象
  // 之后调用上下文对象的方法来进行相应的操作
  onReady(){
    this.context = wx.createVideoContext('myVideo');
  },
  // 发送弹幕
  sendDanmu(){
    this.context.sendDanmu({
      text : this.data.newDanmu,
      color : getRandomColor()
    })
  },
  // 播放视频
  playHandle(){
    this.context.play();
  },
  // 暂停视频
  pauseHandle(){
    this.context.pause();
  }
})