function inherit(target, Origin) {
  function F() {}

  F.prototype = Origin.prototype;

  target.prototype = new F();

  target.prototype.constructor = target;
}

// 基类
var Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.test = 'this is a test';
Person.prototype.testFunc = function () {
  console.log('this is a testFunc');
};

// 子类
var Student = function (name, age, gender, score) {
  Person.apply(this, [name, age]);
  this.gender = gender;
  this.score = score;
};

inherit(Student, Person);

var student = new Student('小明', 18, '男', 90);
console.log(student.name); // 小明
console.log(student.age); // 18
console.log(student.gender); // 男
console.log(student.score); // 90
console.log(student.test); // this is a test
student.testFunc(); // this is a testFunc
