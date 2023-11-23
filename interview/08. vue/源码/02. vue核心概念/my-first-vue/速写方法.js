var obj = {
  name: "张三",
  sayHello() {
    console.log(this.name);
  },
};
obj.sayHello();