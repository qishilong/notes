const { formateDate } = require("../../utils/util");

let _this = null; // 存储 this 指向
let timer = null; // 用来停止计时器函数
// 播放音频的全局上下文对象
const audioContext = wx.createInnerAudioContext();
audioContext.autoplay = true;
audioContext.onEnded(()=>{
  wx.showToast({
    title: '播放结束',
    icon : "success",
    duration: 1000
  })
})
// 全局文件管理
const fileSystem = wx.getFileSystemManager();
// 全局的录音管理对象
const recoderManager = wx.getRecorderManager();
// 该事件会在录音停止时触发
recoderManager.onStop(res=>{
  const { tempFilePath } = res;
  // 做一个文件存储操作
  fileSystem.saveFile({
    tempFilePath,
    success(res){
      console.log("savedFilePath:", res.savedFilePath);
      wx.showToast({
        title: '恭喜！录音成功',
        icon : "success",
        duration: 1000
      });
      getList();
    }
  })
});

/**
 * 从文件系统里面获取所有的录音记录
 */
function getList(){
  // 从文件系统里面获取音频列表，更新 voices 数组
  fileSystem.getSavedFileList({
    success(res){
      const voicesArr = [];
      // 首先对音频进行排序
      res.fileList.sort((a,b) => a.createTime - b.createTime);
      for(let i=0;i<res.fileList.length;i++){
        // 格式化事件
        const createTime = formateDate(res.fileList[i].createTime * 1000);
        // 将音频从 b 转为 Kb
        const size = (res.fileList[i].size / 1024).toFixed(2);
        voicesArr.push({
          filePath : res.fileList[i].filePath,
          createTime,
          size
        })
      }
      console.log(voicesArr)
      _this.setData({
        voices : voicesArr
      })
    }
  })

}


/**
 * 麦克风动画
 */
function speaking(){
  let i = 1;
  timer = setInterval(()=>{
    i++;
    i %= 5;
    _this.setData({
      j : i
    })
  },200)
}


Page({
  data: {
    isSpeaking : false, // 是否显示录音图片
    j : 1, // 录音图片的下标
    voices : [], // 存储所有的录音
  },
  onLoad(){
    _this = this;
    getList();
  },
  // 按下的时候
  touchdown(){
    console.log("手指按下了");
    // 1. 显示录音中的图片
    this.setData({
      isSpeaking : true
    });
    // 播放麦克风动画（不停的修改 j 的值）
    speaking();
    // 2. 开始录音
    recoderManager.start();
  },
  // 抬起来的时候
  touchup(){
    console.log("手指抬起来了");
    this.setData({
      isSpeaking : false
    });
    clearInterval(timer);
    timer = null;
    recoderManager.stop();
  },
  // 播放录音
  gotoPlay(e){
    audioContext.src = e.currentTarget.dataset.key;
    audioContext.play();
    wx.showToast({
      title: '开始播放',
      icon : "success",
      duration: 1000
    })
  },
  // 清除录音
  clearList(){
    fileSystem.getSavedFileList({
      success({fileList}){
        for(let i=0;i<fileList.length;i++){
          fileSystem.removeSavedFile({
            filePath : fileList[i].filePath,
            success(){
              if(i === fileList.length - 1){
                // 说明已经是删除最后一个文件了
                wx.showToast({
                  title: '已清除',
                  icon: "success",
                  duration: 1000
                });
                _this.setData({
                  voices : []
                })
              }
            }
          })
        }
      }
    })
  }
})
