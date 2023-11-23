module.exports = Behavior({
  properties: {
    behaviorProps: String
  },
  data: {
    behaviorContent: "来自于Behavior的content数据"
  },
  lifetimes: {
    created() {
      // console.log("Behavior created");
    },
    attached: function () {
      // console.log("Behavior attached");
    },
  },
  methods : {
    behaviorMethod(){
      console.log("Behavior Method");
    },
    tapHandle(){
      console.log("触发了 Behavior tapHandle事件");
    },
  }
})