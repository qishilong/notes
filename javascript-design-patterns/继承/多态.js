/**
 * 多态
 * 多态，就是同一种方法多种调用方式
 */
function Add() {
  // 无参数算法
  const zero = () => {
    return 10;
  };

  // 一个参数算法
  const one = (num) => {
    return 10 + num;
  };
  // 两个参数算法
  const two = (num1, num2) => {
    return 10 + num1 + num1;
  };
  // 相加共有算法
  this.add = function () {
    const arg = arguments,
      len = arg.length;
    switch (len) {
      case 0:
        return zero();
      case 1:
        return one(arg[0]);
      case 2:
        return two(arg[0], arg[1]);
    }
  };
}
