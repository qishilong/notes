Page({
  data: {
    viewAnimate: "", // 保存一系列的动画队列
    start: "北京", // 起始地
    end: "上海", // 目的地
    lAnimate: "", // 存储左边的动画序列
    rAnimate: "" // 存储右边的动画序列
  },
  startMove() {
    // 书写动画
    // 1. 创建一个动画对象
    const animationObj = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease'
    });
    // 2. 由这个对象来安排动画
    // 书写了动画之后，调用 step 方法表示动画结束
    animationObj.translateX(100).step().opacity(0.5).width(200).step();
    this.setData({
      viewAnimate: animationObj.export()
    })

  },
  trigger() {
    // 动画的配置对象
    const option = {
      duration: 100,
      timingFunction: 'ease-in'
    };
    // 创建动画对象
    const lanimation = wx.createAnimation(option);
    const ranimation = wx.createAnimation(option);
    // 起始地动画
    lanimation.translateX(100).opacity(.1).step();
    // 目的地动画
    ranimation.translateX(-100).opacity(.1).step();
    // 得到动画队列，设置到元素上面去
    this.setData({
      lAnimate: lanimation.export(),
      rAnimate: ranimation.export(),
    });
    // 100ms之后将两个盒子各自又移动回自己之前的位置
    setTimeout(() => {
      // 起始地动画
      lanimation.translateX(0).opacity(1).step();
      // 目的地动画
      ranimation.translateX(0).opacity(1).step();
      // 得到动画队列，设置到元素上面去
      const temp = this.data.start;
      this.setData({
        lAnimate: lanimation.export(),
        rAnimate: ranimation.export(),
        // 接下来再把文字进行交换即可
        end : temp,
        start : this.data.end,
        
      });

      
    }, 100)

  }
})