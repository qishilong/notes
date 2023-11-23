// components/item/item.js
const myBehavior = require("../../behaviors/myBehavior.js");
Component({
  behaviors:[myBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    content : {
      type : String,
      value: "content的默认值"
    },
    count : Number
  },

  externalClasses : ['my-class'],

  /**
   * 该自定义组件所对应的配置
   */
  options : {
    multipleSlots: true, // 开启多插槽选项
  },

  /**
   * 组件的初始数据
   */
  data: {
    name : "自定义组件",
    inputContent : "",
    // behaviorContent: "bbb"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapHandle(){
      console.log("触发了tapHandle事件");
    },
    triggerHandle(){
      // 向父组件传递输入框里面的内容 this.data.inputContent
      // 触发父组件传递过来的自定义事件
      this.triggerEvent('myEvent', {
        inputContent : this.data.inputContent
      });
    },
    inputHandle(){}
  },
  lifetimes : {
    created(){
      console.log("created");
    },
    attached: function() {
      console.log("attached");
    },
    detached: function() {
      console.log("detached");
    },
  }
})
