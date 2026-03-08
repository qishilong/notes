// 使用 JSON.parse() 方法将 JSON 字符串转换为 JavaScript 对象
const deepCloneJsonParse = obj => {
  return JSON.parse(JSON.stringify(obj));
};

// 使用 MessageChannel
const deepClonePostMessage = obj => {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);

    port2.onmessage = data => resolve(data.data);
  });
};

/**
 * 获取数据类型
 * @param {any} value
 * @returns {String} 数据类型
 */
const getType = value => Object.prototype.toString.call(value).slice(8, -1);

// 使用 WeekMap 实现深度拷贝
const deepCloneWeekMap = (source, cache = new WeakMap()) => {
  if (!source || (typeof source !== 'function' && typeof source !== 'object')) {
    return source;
  }

  // 处理循环引用
  if (cache.has(source)) {
    return cache.get(source);
  }

  const type = getType(source);

  // 处理 Date
  if (type === 'Date') {
    return new Date(source.getTime());
  }

  // 处理 RegExp
  if (type === 'RegExp') {
    return new RegExp(source.source, source.flags);
  }

  // 处理 Map
  if (type === 'Map') {
    const map = new Map();
    cache.set(source, map);
    source.forEach((val, key) => {
      map.set(deepCloneWeekMap(key, cache), deepCloneWeekMap(val, cache));
    });
    return map;
  }

  // 处理 Set
  if (type === 'Set') {
    const set = new Set();
    cache.set(source, set);
    source.forEach(value => {
      set.add(deepCloneWeekMap(value, cache));
    });

    return set;
  }

  // 处理 Function
  if (type === 'Function') {
    try {
      const cloneFunc = new Function(`return ${source.toString()}`).call(this);
      cache.set(source, cloneFunc);
      return cloneFunc;
    } catch (error) {
      return source;
    }
  }

  // // 处理 Array 和普通 Object
  // const target = type === 'Array' ? [] : Object.create(Object.getPrototypeOf(source));
  // cache.set(source, target);

  // // 拷贝自身可枚举 + 不可枚举属性，包括 Symbol 键
  // Reflect.ownKeys(source).forEach(key => {
  //   const descriptor = Object.getOwnPropertyDescriptor(source, key);
  //   if (descriptor.value !== undefined) {
  //     descriptor.value = deepCloneWeekMap(descriptor.value, cache);
  //   }
  //   Object.defineProperty(target, key, descriptor);
  // });

  // 处理 Array 和普通 Object
  const target = type === 'Array' ? [] : Object.create(Object.getPrototypeOf(source));

  cache.set(source, target);

  // 拷贝自身枚举 + 不可枚举属性，包括 Symbol 键
  Reflect.ownKeys(source).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (descriptor.value !== undefined) {
      descriptor.value = deepCloneWeekMap(descriptor.value, cache);
    }
    Object.defineProperty(target, key, descriptor);
  });

  return target;
};

const obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  null: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log('我是一个函数');
  },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
  map: new Map([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, { a: 1, b: 2 }]
  ]),
  set: new Set([1, 2, 3, 4, 5, { a: 1, b: 2 }])
};

// const res = deepCloneJsonParse(obj);
// console.log(res);

// deepClonePostMessage(obj).then(data => {
//   console.log(data);
// });

const res = deepCloneWeekMap(obj);
console.log(obj, res);

console.log(res.arr === obj.arr, res.func === obj.func);
