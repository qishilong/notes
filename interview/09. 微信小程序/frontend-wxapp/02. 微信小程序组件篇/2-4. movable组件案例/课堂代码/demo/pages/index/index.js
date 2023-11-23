Page({
  data: {
    messages: [{
        avatar: "/imgs/1.jpeg",
        nickname: "大杨",
        msg: "几点到学校集合？",
        time: "12:07",
        x: 0
      },
      {
        avatar: "/imgs/2.jpeg",
        nickname: "进哥",
        msg: "那道题我解决了，我一会儿给你讲",
        time: "11:05",
        x: 0
      },
      {
        avatar: "/imgs/3.jpeg",
        nickname: "小恐龙",
        msg: "哥，明天有空没有，一起去世贸看电影呗",
        time: "10:37",
        x: 0
      },
      {
        avatar: "/imgs/4.jpeg",
        nickname: "雅静",
        msg: "你最好就在那儿等着我，我到时候过来找你",
        time: "05:20",
        x: 0
      },
      {
        avatar: "/imgs/5.jpeg",
        nickname: "小黄",
        msg: "真的哭死啦 orz",
        time: "03:47",
        x: 0
      },
      {
        avatar: "/imgs/6.jpeg",
        nickname: "婉静",
        msg: "你明天几点的课？",
        time: "01:02",
        x: 0
      }
    ],
    start_x : 0, // 记录开始拖动时的 x 值
  },
  touchstartHandle(event){
    this.setData({
      start_x : event.touches[0].clientX
    })
  },
  touchendHandle(event){
    // 拖动结束时的 clientx
    const current_x = event.changedTouches[0].clientX;
    // 根据起始和结束的 clientx
    // 我们就可以做一个拖动方向以及拖动距离的判断
    const direction = current_x - this.data.start_x;

    const index = ~~event.currentTarget.dataset.index;
    const arr = [...this.data.messages];

    if(direction < 0){
      if(direction < -30){
        // 我们认为用户已经拖动了一段距离
        // 哪怕他没有拖动满，我们应该将删除显示出来
        arr[index].x = -120;
      } else {
        arr[index].x = 0;
      }
      this.setData({
        messages : arr
      })
    } else {
      arr[index].x = 0;
      this.setData({
        messages : arr
      })
    }
  }
})