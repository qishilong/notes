// 手写 call
interface Function {
  myCall: Function;
  myApply: Function;
  myBind: Function;
}
const simulationSymbol = function (obj: any): string {
  const unique = (Math.random() + Date.now()).toString(32).slice(0, 8);
  if (obj.hasOwnProperty(unique)) {
    return simulationSymbol(obj);
  } else {
    return unique;
  }
};

// 判断是不是类数组
const isArrayLike = function (item: any) {
  /*
        1. item 不是null、undefined等
        2. item 是对象
        3. item.length 是有限数值
        4. item.length 为非负值
        5. item.length 是整数
        6. item.length < 2^32   Math.pow(2,32)
    */
  if (
    item &&
    typeof item === "object" &&
    isFinite(item.length) &&
    item.length >= 0 &&
    item.length === Math.floor(item.length) &&
    item.length < Math.pow(2, 32)
  ) {
    return true;
  } else {
    return false;
  }
};

Function.prototype.myCall = function (context: any) {
  if (context === null || context === undefined) {
    context = globalThis;
  } else {
    context = Object(context);
  }
  // 得到一个唯一的id
  const fnId = simulationSymbol(context);
  // const fnId = Symbol(String(context));
  context[fnId] = this;
  const args = [...arguments].slice(1);
  const result = context[fnId](...args);
  delete context[fnId];
  return result;
};

Function.prototype.myApply = function (context: any) {
  if (context === null || context === undefined) {
    context = globalThis;
  } else {
    context = Object(context);
  }

  const fnId = Symbol(String(context));
  context[fnId] = this;
  let args = arguments[1];
  let result = undefined;
  if (!Array.isArray(args) || !isArrayLike(args)) {
    throw new Error(`${args} 不是数组且不是类数组`);
  } else {
    args = Array.from(args);
    result = context[fnId](...args);
  }
  delete context[fnId];
  return result;
};

Function.prototype.myBind = function (context: any) {
  if (typeof context !== "function") {
    throw new Error("Expect is a function");
  }

  const that = this;
  const args = [...arguments].slice(1);
  const fn = function (...newArgs: any) {
    // 判断 fn 是否通过 new 调用
    const isNew = this instanceof fn;
    // 如果是通过 new 调用，就绑定到 this 上，如果不是，就绑定到 context 上
    // 注意: 这里的 context 需要使用 Object() 包装一下，因为原生 bind 支持第一个参数传 null

    // MDN 例子：
    // var YAxisPoint = Point.bind(null, 0 /*x*/);
    /*（译注：polyfill 的 bind 方法中，如果把 bind 的第一个参数加上，
        即对新绑定的 this 执行 Object(this)，包装为对象，
        因为 Object(null) 是 {}，所以也可以支持）*/

    return that.apply(isNew ? this : Object(context), newArgs.concat(args));
  };

  // 复制原函数的 prototype 给 fn，一些情况下函数没有 prototype，比如箭头函数
  if (that.prototype) {
    fn.prototype = Object.create(that.prototype);
  }
  return fn;
};
