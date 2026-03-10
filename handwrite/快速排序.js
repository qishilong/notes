/**
 * 原地交换数组的两个元素
 * @param {number[]} arr
 * @param {number} x
 * @param {number} y
 */
const swap = (arr, x, y) => {
  const temp = arr[x];
  arr[x] = arr[y];
  arr[y] = temp;
};

/**
 * 快速排序
 * @param {number[]} arr
 * @param {number} start
 * @param {number} end
 */
const quickSort = (arr, start, end) => {
  if (start >= end - 1) {
    return;
  }

  let left = start,
    right = end;

  do {
    do {
      left++;
    } while (left < right && arr[left] < arr[start]);

    do {
      right--;
    } while (left < right && arr[right] > arr[start]);

    if (left < right) {
      swap(arr, left, right);
    }
  } while (left < right);

  const pointIndex = left === right ? right - 1 : right;

  swap(arr, start, pointIndex);
  quickSort(arr, start, pointIndex);
  quickSort(arr, pointIndex + 1, end);
};

const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
quickSort(arr, 0, arr.length);
console.log(arr);
