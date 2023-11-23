// index.js
// 获取应用实例
const app = getApp();

// 获取云端的数据库实例
const db = wx.cloud.database();
// 再从数据库中获取到集合（表）
const students = db.collection('F01');

import Notify from '@vant/weapp/notify/notify';

Page({
  data: {
    name : "", // 学生姓名
    age : "", // 学生年龄
    gender : "1", // 学生性别
    htmlScore: "", // html 的分数
    cssScore: "", // css 的分数
    jsScore: "", // js 的分数
  },
  onClick(event){
    const {name} = event.currentTarget.dataset;
    this.setData({
      gender : name
    })
  },
  addStu(){
    // 1. 获取用户的输入 this.data
    // 2. 存储到云端
    students.add({
      data : this.data
    }).then(res=>{
      Notify({ type: 'success', message: '学生添加成功' });
      this.setData({
        name : "", // 学生姓名
        age : "", // 学生年龄
        gender : "1", // 学生性别
        htmlScore: "", // html 的分数
        cssScore: "", // css 的分数
        jsScore: "", // js 的分数
      })
    })
  }
})
