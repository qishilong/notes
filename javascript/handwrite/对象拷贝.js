// const obj = {
//     data: 1,
//     un: undefined,
//     info: {
//         d: 2
//     },
//     fn: function () {
//         console.log('Function');
//     },
//     get c() {
//         return this.info.d;
//     }
// };

/**
 * 浅拷贝
 * 1. Object.assign
 * 2. 不完整的深拷贝 JSON.stringify & JSON.parse
 * 3. Object.create
 */
// 1. Object.assign
// const obj1 = Object.assign({}, obj);
// const obj2 = Object.assign({}, obj);
// console.log(obj1.info === obj2.info);   // true

// 2. 不完整的深拷贝 JSON.stringify & JSON.parse
// const obj1 = JSON.parse(JSON.stringify(obj));
// const obj2 = JSON.parse(JSON.stringify(obj));
// console.log(obj1, obj2);
// console.log(obj1.info === obj2.info);   // false

// 3. Object.create
// const obj1 = Object.create(obj);
// const obj2 = Object.create(obj);
// console.log(obj1, obj2);
// console.log(obj1.__proto__.info === obj2.__proto__.info);   // true

/**
 * 深拷贝
 * 递归实现
 * 这种写法无法解决循环引用的问题
 */

const checkType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1);
};
function deepClone(obj) {
  if (checkType(obj) === "Object") {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = deepClone(obj[key]);
    }
    return newObj;
  } else if (checkType(obj) === "Array") {
    const newArr = [];
    const length = obj.length;
    for (let i = 0; i < length; i++) {
      newArr[i] = deepClone(obj[i]);
    }
    return newArr;
  } else if (checkType(obj) === "Function") {
    return new Function(`return ${obj.toString()}`).call(this);
  } else if (checkType(obj) === "Date") {
    return new Date(obj.valueOf());
  } else if (checkType(obj) === "RegExp") {
    return new RegExp(obj);
  } else if (checkType(obj) === "Map") {
    const newMap = new Map();
    obj.forEach((value, key) => {
      if (typeof value === "object") {
        newMap.set(key, deepClone(value));
      } else {
        newMap.set(key, value);
      }
    });
    return newMap;
  } else if (checkType(obj) === "Set") {
    const newSet = new Set();
    obj.forEach((value) => {
      if (typeof value === "object") {
        newSet.add(deepClone(value));
      } else {
        newSet.add(value);
      }
    });
    return newSet;
  } else {
    return obj;
  }
}

const a = {
  name: "aaa",
  skills: ["踢球", "跑步", "打羽毛球"],
  age: 18,
  love: {
    name: "小红",
    age: 16,
  },
  map: new Map([["aaa", "123"]]),
  fn: function (a, b, c) {
    console.log(`我的名字叫${this.name}` + a);
    return b + c;
  },
  set: new Set([1, 2, 3, 4, 5]),
  date: new Date(),
  reg: /^[1,2]/,
  symbol: Symbol("abc"),
};
// a.loop = a;
const newA = deepClone(a);
a.age = 100;
a.love.age = 100;
a.set.add("1123");
a.skills.push("计算机");
a.name = "bbb";
a.map.set("name", "小明");

console.log(a);
console.log(newA);

// console.log(a.fn('a', 1, 2));
// console.log(newA.fn('newA', 1, 3));
// console.log(a.fn === newA.fn);
// console.log(a.date === newA.date);
// console.log(a.reg === newA.reg);
// console.log(a.symbol === newA.symbol);
