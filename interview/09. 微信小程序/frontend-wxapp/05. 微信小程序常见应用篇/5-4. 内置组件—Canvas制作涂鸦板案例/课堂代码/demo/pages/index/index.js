Page({
  data: {
    ctx: "", // 保存 canvas 上下文
    pen : 5, // 画笔默认的宽度
    color : "#000", // 画笔默认的颜色
  },
  startX : 0, // 保存 X 坐标
  startY : 0, // 保存 Y 坐标
  onLoad() {
    // 获取到 canvas 的上下文，并且保存在 ctx 里面
    const query = wx.createSelectorQuery();
    query.select("#myCanvas")
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 注意，这里还有一个非常关键的步骤
        // 在新版的 canvas 接口中需要显式的设置画布的宽高
        // 一定要手动指定画布的宽高
        // 否则画布会被拉伸
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr);

        this.setData({
          ctx
        });
      })
  },
  touchstart(e) {
    // 拿到手指按下时的坐标
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;

    // 进行一些绘制的准备工作（笔粗细、颜色、笔头）
    // 如果使用过微信小程序旧版接口的同学，需要注意
    // 现在很多方法都没有，已经停止维护
    this.data.ctx.lineWidth = this.data.pen; // 笔粗细
    this.data.ctx.strokeStyle = this.data.color; // 画笔颜色
    this.data.ctx.lineCap = 'round'; // 设置笔头

    // 开始绘制
    this.data.ctx.beginPath();
    
  },
  touchmove(e) {
    // 移动的时候，得到的实时的坐标
    var startX1 = e.changedTouches[0].x;
    var startY1 = e.changedTouches[0].y;
    // 首先将画笔移动到手指按下的地方
    this.data.ctx.moveTo(this.startX, this.startY);
    // 描线，根据实时的坐标进行进行描线
    this.data.ctx.lineTo(startX1, startY1);
    // 绘制直线
    this.data.ctx.stroke();

    // 注意，这个步骤也很重要，需要更新起始坐标
    this.startX = startX1;
    this.startY = startY1;
  },
  touchend() {
    this.data.ctx.closePath();
  },
  // 选择画笔的粗细
  penSelect(e){
    if(this.data.color === "#ddd"){
      // 从橡皮擦切换过来的
      // 需要还原颜色
      this.setData({
        pen : parseInt(e.currentTarget.dataset.param),
        color : "#000"
      })
    } else {
      this.setData({
        pen : parseInt(e.currentTarget.dataset.param),
      })
    }
  },
  // 设置颜色
  colorSelect(e){
    this.setData({
      color : e.currentTarget.dataset.param
    })
  },
  // 橡皮擦
  clearCanvas(){
    this.setData({
      color : '#ddd',
      pen : 20
    })
  }
})