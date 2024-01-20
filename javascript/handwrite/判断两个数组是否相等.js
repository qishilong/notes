// 暂时不考虑数组中还包含其他引用类型数据
const arr1 = [1, 2, 32, 1, "a", undefined, NaN];
const arr2 = [1, 2, 32, 1, "a", undefined, NaN];

const judgeArrIsEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 用来记数的 map
  const countMap = new Map();

  // 记录第一个数组的数量
  for (const item of arr1) {
    countMap.set(item, (countMap.get(item) || 0) + 1);
  }

  // 对比第二个数组并减数
  for (const item of arr2) {
    const value = countMap.get(item);
    if (!value || value <= 0) {
      return false;
    }
    countMap.set(item, value - 1);
  }

  return true;
};

const result = judgeArrIsEqual(arr1, arr2);
console.log(result);
