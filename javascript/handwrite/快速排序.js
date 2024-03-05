const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const quickSort = (arr, begin, end) => {
  if (begin >= end - 1) {
    return arr;
  }
  let left = begin,
    right = end;

  do {
    do {
      left++;
    } while (left < right && arr[left] < arr[begin]);
    do {
      right--;
    } while (left < right && arr[right] > arr[begin]);
    if (left < right) {
      swap(arr, left, right);
    }
  } while (left < right);

  const pointIndex = left === right ? right - 1 : right;

  swap(arr, begin, pointIndex);
  quickSort(arr, begin, pointIndex);
  quickSort(arr, pointIndex + 1, end);
};

const quickSortFn = (arr) => {
  if (!arr || arr.length === 0) {
    return arr;
  }
  quickSort(arr, 0, arr.length);
};

const arr = [1, 2, 3, 43, 14, 53, 21, 4532, 52, 14, 53, 14, 53, 2, 52, 452];

quickSortFn(arr);

console.log(arr);
