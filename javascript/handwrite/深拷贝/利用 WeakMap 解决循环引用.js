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

/**
 * 得到数据类型
 * @param {*} val
 */
const getType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

const getObjectType = (val) => (typeof val === "function" || typeof val == "object") && !!val;

const deepClone = (obj, weakMap = new WeakMap()) => {
  if (!obj) {
    return obj;
  }

  // 如果循环引用了，就是用 weakMap 解决
  if (weakMap.has(obj)) {
    return weakMap.get(obj);
  }

  if (obj.constructor === Date) {
    return new Date(obj);
  } else if (obj.constructor === RegExp) {
    return new RegExp(obj);
  } else if (obj.constructor === Function) {
    try {
      const cloneFunction = new Function(`return ${obj.toString()}`).call(this);
      weakMap.set(obj, cloneFunction);
      return cloneFunction;
    } catch (e) {
      // 如果无法通过 new Function 处理，尝试直接复制
      return obj;
    }
  } else if (obj.constructor === Set) {
    const set = new Set();
    weakMap.set(obj, set);
    obj.forEach((val) => {
      if (getObjectType(val)) {
        set.add(deepClone(val, weakMap));
      } else {
        set.add(val);
      }
    });
    return set;
  } else if (obj.constructor === Map) {
    const map = new Map();
    weakMap.set(obj, map);
    map.forEach((val, key) => {
      if (getObjectType(val)) {
        map.set(key, deepClone(val, weakMap));
      } else {
        map.set(key, val);
      }
    });
    return map;
  } else if (obj.constructor === Array) {
    const cloneArr = [];
    weakMap.set(obj, cloneArr);
    for (let i = 0, len = obj.length; i < len; i++) {
      if (getObjectType(obj[i])) {
        cloneArr[i] = deepClone(obj[i], weakMap);
      } else {
        cloneArr[i] = obj[i];
      }
    }
    return cloneArr;
  }

  // 得到参数的所有特性
  const objDesc = Object.getOwnPropertyDescriptors(obj);

  // 继承原型链
  const cloneObj = Object.create(Object.getPrototypeOf(obj), objDesc);

  weakMap.set(obj, cloneObj);

  for (const key of Reflect.ownKeys(obj)) {
    cloneObj[key] = getObjectType(obj[key]) ? deepClone(obj[key], weakMap) : obj[key];
  }

  return cloneObj;
};

const result = deepClone(obj);
console.log(result);
console.log(
  obj.arr.constructor === Array,
  obj.reg.constructor === RegExp,
  result.arr === obj.arr,
  result.obj === obj.obj,
  obj.reg === result.reg,
  obj.map === result.map,
  obj.date === result.date,
  obj.func === result.func,
);
