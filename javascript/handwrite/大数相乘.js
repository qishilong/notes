/**
 * 大数相乘
 * @param {string} num1
 * @param {string} num2
 */
const multiplyStrings = (num1, num2) => {
  // 判断正负号
  const sign = (num1[0] === "-" ? -1 : 1) * (num2[0] === "-" ? -1 : 1);

  // 移除正负号
  num1 = num1.replace(/^-/, "");
  num2 = num2.replace(/^-/, "");

  // 小数点处理
  const dotIndex1 = num1.indexOf(".");
  const dotIndex2 = num2.indexOf(".");
  const dotOffset =
    (dotIndex1 === -1 ? 0 : num1.length - 1 - dotIndex1) +
    (dotIndex2 === -1 ? 0 : num2.length - 1 - dotIndex2);

  num1 = num1.replace(".", "");
  num2 = num2.replace(".", "");

  // 乘法
  const len1 = num1.length,
    len2 = num2.length;
  const result = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const product = Number(num1[i]) * Number(num2[j]);
      const sum = product + result[i + j + 1];
      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  // 转换为字符串
  let resultStr = result.join("");

  // 处理小数点
  if (dotOffset > 0) {
    const dotIndex = resultStr.length - dotOffset;
    resultStr = resultStr.slice(0, dotIndex) + "." + resultStr.slice(dotIndex);
  }

  // 移除前导零
  resultStr = resultStr.replace(/^0+/, "");

  // 添加正负号
  if (resultStr !== 0) {
    if (sign === -1) {
      resultStr = "-" + resultStr;
    }
  }

  return resultStr;
};

const num1 = "1234567.89";
const num2 = "-1234567.89";

const result = multiplyStrings(num1, num2);

console.log(result);
