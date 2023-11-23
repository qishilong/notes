const db = wx.cloud.database();
const messages = db.collection('messages');

Page({
  data: {
    content : "" , // 用户输入的新的说说内容
    fileList : [], // 说说对应的图片
  },
  // 读取用户选择的图片
  // 回填到 fileList 里面
  // 从而让用户选择的图片能够显示出来
  afterRead(event){
    const newFileList = [...this.data.fileList];
    const {file} = event.detail;
    for(let i=0;i<file.length;i++){
      newFileList.push({
        url : file[i].url
      })
    }
    this.setData({
      fileList : newFileList
    })
  },
  // 删除当前的图片
  deleteHandle(event){
    const index = event.detail.index;
    const newFileList = [...this.data.fileList];
    newFileList.splice(index, 1);
    this.setData({
      fileList : newFileList
    })
  },
  // 发表说说
  async publishHandle(){
    const picArr = []; // 存储云端返回的云端路径
    // 1. 既然已经点击了【发布按钮】
    // 说明要上传什么图片已经确定了
    // 先把图片上传到云端服务器
    wx.showLoading({
      title: '发表中',
    });
    for(let i=0;i<this.data.fileList.length;i++){
      // 拿到 url
      const url = this.data.fileList[i].url;
      const name = Math.random() * 10000;
      // 存储到云端的文件名
      const cloudPath = name + url.match(/\.[^.]+?$/)[0];
      // 开始上传到云端
      const uploadResult = await wx.cloud.uploadFile({
        cloudPath,
        filePath : url
      });
      picArr.push(uploadResult.fileID);
      if(i === this.data.fileList.length - 1){
        // 说明已经上传完最后一张图片了
        // 组装这一条说说数据，准备存储到云数据库
        const data = {
          content : this.data.content, // 这条说说的内容
          picPath : picArr, // 这条说说所有图片的云端路径
          publishDate : new Date().getTime().toString()
        }
        // 存储到云数据库
        await messages.add({data});
        // 4. 清空文本
        this.setData({
          content : "",
          fileList : []
        });
        wx.hideLoading();
        wx.showToast({
          title: '发表成功',
          icon : "success"
        })
      }
    }
  }
})