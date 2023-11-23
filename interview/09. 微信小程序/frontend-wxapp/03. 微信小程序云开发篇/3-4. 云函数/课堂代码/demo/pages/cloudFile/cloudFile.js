import Notify from '@vant/weapp/notify/notify';
Page({
  data: {
    fileList: [],
  },
  // 读取用户选择的图片
  // 回填到 fileList 里面
  // 从而让用户选择的图片能够显示出来
  afterRead(event){
    const { file } = event.detail;
    console.log(file);
    const newFileList = [...this.data.fileList];
    newFileList.push({
      url : file.url
    });
    this.setData({
      fileList : newFileList
    })
  },
  // 删除已经选择的图片
  deleteHandle(event){
    const index = event.detail.index;
    const newFileList = [...this.data.fileList];
    newFileList.splice(index, 1);
    this.setData({
      fileList : newFileList
    })
  },
  // 将图片上传到云端
  uploadHandle(){
    wx.showLoading({
      title: '上传中',
    });
    for(let i=0;i<this.data.fileList.length;i++){
      // 拿到当前这张图片的 url
      const url = this.data.fileList[i].url;
      const name = Math.random() * 10000;
      const cloudPath = name + url.match(/\.[^.]+?$/)[0];
      wx.cloud.uploadFile({
        cloudPath,
        filePath : url,
        success: res=> {
          console.log(res.fileID);
        },
        fail : console.error,
        complete: ()=>{
          if(i === this.data.fileList.length - 1){
            // 上传的是最后一张
            wx.hideLoading();
            Notify({ type: 'success', message: '上传文件成功' });
          }
        }
      });
    }
  }
})