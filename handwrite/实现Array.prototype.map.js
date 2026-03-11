Array.prototype.myMap = function (callback, thisArgs) {
  // 排除回调为非函数的情况
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }

  // 排除 this 为非可迭代对象的情况
  if (this === null || typeof this[Symbol.iterator] !== 'function') {
    throw new TypeError(`${this} is not a iterator`);
  }

  // 将可迭代对象转换为数组
  const arr = [...this];
  const result = [];

  const length = arr.length;

  for (let i = 0; i < length; i++) {
    result.push(callback.call(thisArgs, arr[i], i, this));
  }

  return result;
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.myMap((val, index, arr) => {
  console.log(val, index, arr);
  return val * 2;
});

console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
