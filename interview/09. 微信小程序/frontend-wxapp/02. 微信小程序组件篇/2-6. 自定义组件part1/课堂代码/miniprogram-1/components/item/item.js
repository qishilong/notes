// components/item/item.js
Component({
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
    name : "自定义组件"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapHandle(){
      console.log("触发了tapHandle事件");
    }
  }
})
