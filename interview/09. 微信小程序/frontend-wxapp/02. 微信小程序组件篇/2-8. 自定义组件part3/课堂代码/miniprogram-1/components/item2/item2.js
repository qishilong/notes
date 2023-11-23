Component({
  data: {
    a : 1,
    b : 1,
    sum : 2
  },
  methods: {
    tapHandle1(){
      this.setData({
        a : this.data.a + 1
      })
    },
    tapHandle2(){
      this.setData({
        b : this.data.b - 1
      })
    }
  },
  observers : {
    'a, b' : function(a, b){
      this.setData({
        sum : a + b
      })
    }
  }
})
