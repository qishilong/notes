Array.prototype.myFlat = function (depth = 1) {
  if (typeof depth !== 'number' || isNaN(depth)) {
    return this;
  }

  const result = [];

  depth--;

  for (const item of this) {
    if (Array.isArray(item) && depth >= 0) {
      result.push(...item.myFlat(depth));
    } else {
      result.push(item);
    }
  }

  return result;
};

const arr = [1, [2, 3, [4, 5, [12, 3, 'zs'], 7, [8, 9, [10, 11, [1, 2, [3, 4]]]]]]];

const result = arr.myFlat(1);
console.dir(result, { depth: null });
