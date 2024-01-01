/**
 * 将任意进制数字转换为目标进制，不利用 toString
 * @param {*} number 任意进制数字
 * @param {*} fromBase 传进来的进制
 * @param {*} toBase 目标进制
 */
const decimalTransition = (number, fromBase, toBase) => {
  number = String(number);

  // 将任意进制转换成十进制
  const toDecimal = (number, base) => {
    let decimalNumber = 0,
      power = 0;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i], base);
      decimalNumber += digit * Math.pow(base, power);
      power++;
    }
    return decimalNumber;
  };

  // 将十进制转换为任意进制
  const fromDecimal = (decimalNumber, base) => {
    let result = "";
    while (decimalNumber > 0) {
      let remainder = decimalNumber % base;
      result += remainder;
      decimalNumber = Math.floor(decimalNumber / base);
    }

    // 考虑 0 的情况
    return result || 0;
  };

  const negative = number.startsWith("-");

  // 处理负数的情况
  if (negative) {
    number.substring(1);
  }

  // 转换为十进制
  const decimalNumber = toDecimal(number, fromBase);

  // 转换为目标进制
  let result = fromDecimal(decimalNumber, toBase);

  // 添加负号
  if (negative) {
    result = "-" + result;
  }
  return result;
};

const number = "1A";
const result = decimalTransition(number, 10, 16);
console.log(result);
