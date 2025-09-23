/**
 * 1. 类式继承
 */
// 声明父类
function SuperClass() {
  this.superValue = value;
}
// 为父类添加共有方法
SuperClass.prototype.getSuperValue = function () {
  return this.superValue;
};

// 声明子类
function SubClass() {
  this.subValue = false;
}

// 继承父类
SubClass.prototype = new SuperClass();

// 为子类添加共有方法
SubClass.prototype.getSubValue = function () {
  return this.subValue;
};

// --> 演变

/**
 * 2. 构造函数继承
 */
// 声明父类
function SuperClass(id) {
  // 引用类型共有属性
  this.books = ["js", "html", "css"];
  // 值类型共有属性
  this.id = id;
}

// 父类声明原型方法
SuperClass.prototype.showBooks = function () {
  console.log(this.books);
};
// 声明子类
function SubClass(id) {
  SuperClass.call(this, id);
}

// 创建第一个子类的实例
var ins1 = new SubClass(10);
var ins2 = new SubClass(11);

// --> 演变

/**
 * 3. 组合继承
 */

// 声明父类
function SuperClass(name) {
  // 值类型共有属性
  this.name = name;
  // 引用类型共有属性
  this.books = ["html", "css", "js"];
}

// 父类原型共有方法
SuperClass.prototype.getName = function () {
  console.log(this.name);
};
// 声明子类
function SubClass(name, time) {
  // 构造函数式继承父类 name 属性
  SuperClass.call(this, name);
  // 子类中新增共有属性
  this.time = time;
}

// 类式继承 子类原型继承父类
SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function () {
  console.log(this.time);
};

// --> 演变

/**
 * 4. 原型式继承
 */
// 原型式继承
function inheritObject(o) {
  // 声明一个过渡函数
  function F() {}
  // 过渡对象的原型继承父对象
  F.prototype = o;
  // 返回过渡对象的一个实例，该实例的原型继承了父对象
  return new F();
}

// --> 演变

/**
 * 5. 寄生式继承
 */
var book = {
  name: "js",
  alikeBook: ["css book", "html book"],
};
function createBook(obj) {
  // 通过原型继承方式创建新对象
  var o = new inheritObject(obj);
  // 拓展新对象
  o.getName = function () {
    console.log(name);
  };
  // 返回拓展后的新对象
  return o;
}

// --> 演变

/**
 * 寄生组合式继承
 * @param {*} subClass	子类
 * @param {*} superClass	父类
 */
function InheritPrototype(subClass, superClass) {
  // 复制一份父类的原型副本保存在变量中
  var p = inheritObject(superClass.prototype);
  // 修正因为重写子类原型导致子类的 constructor 属性被修改
  p.constructor = subClass;
  // 设置子类的原型
  subClass.prototype = p;
}
