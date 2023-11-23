Page({
  delay(duration){
    console.log("阻塞开始");
    var start = Date.now();
    while (Date.now() - start < duration) {}
    console.log("阻塞结束");
  },
  handletap(){
    this.delay(5000);
  }
})