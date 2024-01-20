function myFlat(arr, num = 1) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && num > 0) {
      result = result.concat(myFlat(item, num - 1));
    } else {
      result.push(item);
    }
  });
  return result;
}

const arr = [
  1,
  2,
  [1, 2, 3],
  [12, 3],
  [1, 2, 3],
  1,
  2,
  34,
  [1, 2],
  3,
  4,
  { a: 1 },
  3,
  [12, 3, 1, [2, [3, [1, 2, 3, [1, 2, [1, [2, [3, 2, 3, [12, [321, [32, 12, 3, [1, 2, 3]]]]]]]]]]]],
  { a: 1 },
];

const result = myFlat(arr, Infinity);
console.log(result);
