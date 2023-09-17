function Parent(name: any, age: any) {
    this.name = name;
    this.age = age;
}
Parent.prototype.sayName = function () {
    console.log(this.name);
};

function newMethod(Parent: any, ...args: any) {
    // 1.以构造器的prototype属性为原型，创建新对象；
    const child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    const result = Parent.apply(child, args);
    // 3. 如果构造器没有手动返回对象，则返回第一步的对象
    return typeof result === 'object' ? result : child;
}

//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 18);
child.sayName(); //'echo';
//最后检验，与使用new的效果相同
console.log(child instanceof Parent);//true
console.log(child.hasOwnProperty('name'));//true
console.log(child.hasOwnProperty('age'));//true
console.log(child.hasOwnProperty('sayName'));//false
console.log(child.__proto__.hasOwnProperty('sayName'));// true