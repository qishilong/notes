Component({
  relations : {
    '../ul/ul' : {
      type : 'parent', // 关联的 ul 这个自定义组件和你是什么关系
      linked(target){
        // 每当有一个关联的 li 这个自定义组件被插入到 ul 的时候
        console.log('li-->target',target);
        console.log(target.data.name);
      }
    }
  },
  data : {
    name : "我是li元素"
  },
})
