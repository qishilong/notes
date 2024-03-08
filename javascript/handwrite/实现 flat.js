const arr = [1, [2, 3, [4, 5, [12, 3, 'zs'], 7, [8, 9, [10, 11, [1, 2, [3, 4]]]]]]];

// 判断类型
function checkTypes(item) {
  return Object.prototype.toString.call(item).slice(8, -1);
}

Array.prototype.myFlat = function (num = 1) {
  const type = checkTypes(this);
  if (!Object.is(type, 'Array')) {
    return;
  }
  const result = [];
  this.forEach((item) => {
    const type = checkTypes(item);
    if (Object.is(type, 'Array')) {
      // console.log(num);
      num--;
      if (num < 0) {
        return result.push(item);
      }
      result.push(...item.myFlat(num));
    } else {
      result.push(item);
    }
  });
  return result;
};

console.time();

console.log(arr.flat(Infinity)); //[1, 2, 3, 4, 5, 12, 3, "zs", 7, 8, 9, 10, 11, 1, 2, 3, 4];

console.log(arr.myFlat(Infinity)); //[1, 2, 3, 4, 5, 12, 3, "zs", 7, 8, 9, 10, 11, 1, 2, 3, 4];
//自定义方法和自带的flat返回结果一致!!!!
console.timeEnd();
