/**
 * 多继承 属性复制（这里只是浅复制，可以改成深拷贝）
 * 也可以直接加入到 Object.prototype 中。以后直接调用 Object.prototype 即可
 */
const mix = function () {
  let i = 1, // 从第二个参数起为被继承的对象
    len = arguments.length, // 获取参数长度
    target = arguments[0], // 第一个对象为目标对象
    arg; // 缓存参数对象

  for (; i < len; i++) {
    arg = arguments[i]; // 缓存当前对象a
    for (const key in arg) {
      // 将被继承对象中的属性复制到目标对象中
      target[key] = arg[key];
    }
  }

  // 返回目标对象
  return target;
};
