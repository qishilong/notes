Component({
  data : {
    name : "我是ul"
  },
  relations : {
    '../li/li' : {
      type : 'child', // 关联的 li 这个自定义组件和你是什么关系
      linked(target){
        // 每当有一个关联的 li 这个自定义组件被插入到 ul 的时候
        console.log('ul-->target',target.data.name);
        target.triggerEvent("test");

        const nodes = this.getRelationNodes("../li/li");
        console.log("nodes--->",nodes)
      }
    }
  }
})
