/**
 * 1. 牛顿迭代法
 * @param {*} num
 */
function sqrt(num) {
  if (num === 0) return 0;
  let guess = num;
  // 精度
  const accuracy = 1e-31;
  while (Math.abs(guess - num / guess) > accuracy) {
    guess = (num / guess + guess) / 2.0;
  }
  return guess;
}

console.log(sqrt(4)); // 输出：2
console.log(sqrt(9)); // 输出：3

/**
 * 2. 利用二分查找
 * @param {*} num
 */
function sqrt(num) {
  if (num === 0 || num === 1) {
    return num;
  }
  let start = 0,
    end = num,
    precision = 0.0001;

  while (end - start > precision) {
    let mid = start + (end - start) / 2;
    if (mid * mid > num) {
      end = mid;
    } else {
      start = mid;
    }
  }

  return parseFloat(start.toFixed(4));
}

console.log(sqrt(4)); // 输出：2.0000
console.log(sqrt(8)); // 输出：2.8284
