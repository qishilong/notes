const isDateType = (data) =>
  (typeof data === "function" || typeof data === "object") && data !== null;

/**
 * 1. 使用 weekMap 解决
 * 实现深度克隆（基本上能够满足深度克隆的所有要求）
 * 1. 考虑各种数据类型，存在构造函数的可以用 new Xxxx()
 * 2. 如果存在循环引用，使用 WeekMap 记录
 * @param {*} obj
 * @param {*} hash
 */
function deepClone(obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj); // 如果是日期对象，直接返回一个新的日期对象
  } else if (obj.constructor === RegExp) {
    return new RegExp(obj); // 如果是正则对象，直接返回一个新的正则对象
  } else if (obj.constructor === Function) {
    return new Function(`return ${obj.toString()}`).call(this);
  } else if (obj.constructor === Map) {
    const map = new Map();
    obj.forEach((value, key) => {
      if (typeof value === "object") {
        map.set(key, deepClone(value, hash));
      } else {
        map.set(key, value);
      }
    });
    return map;
  } else if (obj.constructor === Set) {
    const set = new Set();
    obj.forEach((value) => {
      if (typeof value === "object") {
        set.add(deepClone(value, hash));
      } else {
        set.add(value);
      }
    });
    return set;
  }

  // 如果循环引用了，就使用 WeekMap 解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 遍历传入参数所有键的特性
  let allDesc = Object.getOwnPropertyDescriptors(obj);

  // 继承原型链
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = isDateType(obj[key]) ? deepClone(obj[key], hash) : obj[key];
  }

  return cloneObj;
}

/**
 * 2. 使用 MessageChannel 解决
 * 缺点：
 * 1. 无法克隆带有函数的对象
 * 2. 一旦开始监听无法主动停止
 * @param {*} obj
 */
// const deepClone = (obj) => {
//   return new Promise((resolve, reject) => {
//     const { port1, port2 } = new MessageChannel();
//     port1.postMessage(obj);
//     port2.onmessage = (msg) => resolve(msg.data);
//   });
// };

let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
  map: new Map([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, { a: 1, b: 2 }],
  ]),
  set: new Set([1, 2, 3, 4, 5, { a: 1, b: 2 }]),
};

Object.defineProperty(obj, "innumerable", { enumerable: "false", value: "不可枚举属性" });
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
obj.loop = obj; // 设置 loop 成循环引用的属性
let cloneObj = deepClone(obj);
console.log(cloneObj);

// deepClone(obj).then((res) => console.log(res));

// cloneObj.arr.push(4);
// console.log(
// 	obj,
// 	cloneObj,
// 	obj.func === cloneObj.func,
// 	obj.map === cloneObj.map,
// 	obj.set === cloneObj.set,
// );
// obj.func();
// cloneObj.func();
