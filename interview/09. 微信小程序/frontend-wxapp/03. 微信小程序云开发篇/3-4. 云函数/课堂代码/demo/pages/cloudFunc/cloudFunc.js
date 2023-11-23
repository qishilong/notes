Page({
  data: {
    num1 : "",
    num2 : "",
    result : "",
  },
  calc(ev){
    console.log(this.data.num1);
    console.log(this.data.num2);
    console.log(ev.target.dataset.id);
    // 接下来我们就来调用云函数
    wx.cloud.callFunction({
      name : "calc",
      data : {
        num1 : this.data.num1,
        num2 : this.data.num2,
        tag : ev.target.dataset.id
      },
      success: ({result})=>{
        this.setData({
          result : result.calcResult
        })
      },
      fail : console.error
    });
  }
})