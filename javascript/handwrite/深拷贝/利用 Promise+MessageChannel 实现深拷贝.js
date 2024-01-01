let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  // func: function () {
  //   console.log("我是一个函数");
  // },
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
 * 利用 MessageChannel 实现深度克隆
 * 因为 MessageChannel 的特性不能传递函数
 * @param {*} obj
 */
const deepClone = (obj) => {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = (msg) => resolve(msg.data);
  });
};

deepClone(obj).then((res) => console.log(res));
