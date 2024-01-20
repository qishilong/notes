/**
 * 使用随机数+时间戳实现一个唯一数，保证返回值唯一
 * @param {*} obj
 * @return {*}
 */
function mySymbol(obj) {
  const unique = (Math.random() + Date.now()).toString(32).slice(0, 8);
  if (obj.hasOwnProperty(unique)) {
    return mySymbol(obj);
  } else {
    return unique;
  }
}

/**
 * 判断是不是类数组
 * @param {*} o
 */
function isArrayLike(o) {
  if (
    o && // o不是null、undefined等
    typeof o === "object" && // o是对象
    isFinite(o.length) && // o.length是有限数值
    o.length >= 0 && // o.length为非负值
    o.length === Math.floor(o.length) && // o.length是整数
    o.length < 4294967296
  ) {
    // o.length < 2^32   Math.pow(2,32)
    return true;
  } else {
    return false;
  }
}

// 手写 call
Function.prototype.myCall = function (context) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const fn = mySymbol(context); // 这里也可以直接使用 Symbol 实现
  context[fn] = this;
  const args = [...arguments].slice(1);
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// 手写 apply
Function.prototype.myApply = function (context) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }

  const fn = mySymbol(context);
  context[fn] = this;
  const args = arguments[1];
  let result;
  if (!Array.isArray(args) || !isArrayLike(args)) {
    throw new Error("第二个参数不是数组且不是类数组");
  } else {
    args = Array.prototype.slice.call(args); // 有很多种转换方法，for 循环，扩展运算符 [...x]，Array.from() 等
    result = context[fn](...args);
  }
  delete context[fn];
  return result;
};

// 手写 bind
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Expect is a function");
  }

  const self = this;
  const args = [...arguments].slice(1);
  const fn = function (...newArgs) {
    // 判断返回的 fn 是否使用 new 调用，如果使用 new 调用，就绑定到 this 上，否则绑定到 context 上
    const isNew = this instanceof fn;
    return self.apply(isNew ? this : Object(context), newArgs.concat(args));
  };

  // 复制原函数的 prototype 给 fn，一些情况下函数没有 prototype，比如箭头函数
  if (self.prototype) {
    fn.prototype = Object.create(self.prototype);
  }
  return fn;
};
