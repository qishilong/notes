/**
 * 任意进制之间的转换
 * 利用 toString
 * @param {*} number
 * @param {*} fromBase
 * @param {*} toBase
 */
const decimalTransitionToString = (number, fromBase, toBase) => {
  // 将目标数转换为十进制数字
  const decimalNumber = parseInt(number, fromBase);

  // 将十进制数字转换为目标进制
  return decimalNumber.toString(toBase);
};

const number = 1;
const result = decimalTransitionToString(number, 10, 16);
console.log(result);
