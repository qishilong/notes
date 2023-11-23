// 引入工具函数
const {
  formateDate
} = require("../../utils/util.js");

Component({
  properties: {
    item: Object
  },
  data: {
    dateInfo : null, // 存储处理后的时间
    imgArr : [], // 用来存储下载后的图片
  },
  methods: {
    // 预览图片
    previewHandle(ev){
      const src = ev.target.dataset.src;
      wx.previewImage({
        urls: this.data.imgArr,
        current : src
      })
    }
  },
  lifetimes : {
    async attached() {
      const item = this.properties.item;
      // 重新设置时间，将时间戳转为可显示格式
      this.setData({
        dateInfo : formateDate(item.publishDate)
      });
      // 接下来要处理的是图片了
      // 图片我们现在拿到的是云端的路径
      // 我们需要通过云端路径下载图片
      const arr = [...this.data.imgArr];
      for(let i=0;i<item.picPath.length;i++){
        const res = await wx.cloud.downloadFile({
          fileID : item.picPath[i]
        });
        arr.push(res.tempFilePath);
        // 等下载到最后一张的时候，再统一更新 imgArr
        if(i === item.picPath.length - 1){
          this.setData({
            imgArr: arr
          })
        }
      }
    }
  }
})