interface Object {
  myIs: Function;
}
Object.myIs = function (x: any, y: any) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
};

console.log(Object.myIs(NaN, NaN));
