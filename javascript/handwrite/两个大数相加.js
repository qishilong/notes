const addLargeNumbers = (num1, num2) => {
  if (typeof num1 !== "string" && typeof num2 === "string") {
    num1 = num1.toLocaleString(undefined, { useGrouping: false });
  } else if (typeof num1 === "string" && typeof num2 !== "string") {
    num2 = num2.toLocaleString(undefined, { useGrouping: false });
  } else {
    num1 = num1.toLocaleString(undefined, { useGrouping: false });
    num2 = num2.toLocaleString(undefined, { useGrouping: false });
  }
  const maxLen = Math.max(num1.length, num2.length);

  // 将数字转换为逆序的数组，方便从个位开始相加
  const arr1 = num1.padStart(maxLen, "0").split("").reverse();
  const arr2 = num2.padStart(maxLen, "0").split("").reverse();

  // 当前进位的大小
  let carry = 0;
  // 结果数组
  const result = [];

  for (let i = 0; i < maxLen; i++) {
    // 将当前对应的数字相加，并且加上上一次操作需要的进位
    const digitSum = parseInt(arr1[i]) + parseInt(arr2[i]) + carry;
    // 取当前相加和的个位数，并且加入到结果数组中
    result.push(digitSum % 10);
    // 更新进位以供下一次迭代使用
    carry = Math.floor(digitSum / 10);
  }

  // 如果当前还有进位，说明是最高位，将最高位加入到结果数组
  if (carry > 0) {
    result.push(carry);
  }

  // 将结果数组逆序并转换为字符串
  return result.reverse().join("");
};

// 示例
const num1 = Number.MAX_VALUE;
const num2 = Number.MAX_VALUE;

const result = addLargeNumbers(num1, num2);
console.log(result);
